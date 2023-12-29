import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { Role, User } from "@prisma/client";

export interface Session {
  user: {
    email: string;
    id: string;
    name: string;
    image?: string;
    role: Role;
  };
}

export const getSession = async () => {
  return getServerSession(authOptions) as Promise<Session>;
};

interface WithAuthHandler {
  ({
    req,
    params,
    searchParams,
    headers,
    session,
  }: {
    req: Request;
    params: Record<string, string>;
    searchParams: Record<string, string>;
    headers?: Record<string, string>;
    session: Session;
    currentUser: User
  }): Promise<Response>;
}

interface RequiredRole {
  requiredRole?: Array<Role>;
}

export const withAuth = (handler: WithAuthHandler, { requiredRole = [] }: RequiredRole = {}) => async (
    req: Request,
    { params }: { params: Record<string, string> | undefined }
  ) => {
    const searchParams = getSearchParams(req);

    let session: Session | undefined;
    let headers = {};

    session = await getSession();

    if (!session) {
      return new Response("Unauthorized: Login required.", {
        status: 401,
        headers,
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
        email: session.user.email,
        role: session.user.role,
      },
    });

    if (!user) {
      return new Response("Unauthorized: Login required.", {
        status: 401,
        headers,
      });
    }

    if (requiredRole.length > 0 && !requiredRole.includes(user.role)) {
      return new Response("Unauthorized: Role required.", {
        status: 401,
        headers,
      });
    }

    return handler({
      req,
      params: params || {},
      searchParams,
      headers,
      session,
      currentUser: user
    });
  };

const getSearchParams = (req: Request) => {
  return Object.fromEntries(new URL(req.url).searchParams);
};
