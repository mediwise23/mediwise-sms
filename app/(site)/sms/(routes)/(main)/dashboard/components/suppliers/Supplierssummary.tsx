import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PatientsTotalType } from "./SuppliersTab";
import { useMemo } from "react";

type SuppliersSummaryProps = {
  data: PatientsTotalType[];
};

const SuppliersSummary = ({ data }: SuppliersSummaryProps) => {
  const fullTotal = useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.numberOfRequest, 0);
  }, [data]);

  return (
    <Table>
      <TableCaption>A list of barangay request per month</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Month</TableHead>
          <TableHead>Request</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.month}</TableCell>
            <TableCell className="text-left">
              {invoice.numberOfRequest}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow className="dark:text-white">
          <TableCell colSpan={1}>Total</TableCell>
          <TableCell className="text-left">{fullTotal}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
export default SuppliersSummary;
