import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type AppointmentSummaryProps = {
  data: DashboardAlumniTotalType[];
};

export type DashboardAlumniTotalType = {
  id: number;
  numberOfAppointments: number;
  month: string;
};

const AppointmentSummary = ({ data }: AppointmentSummaryProps) => {
  return (
    <Table>
      <TableCaption>A list of appointments per month</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Month</TableHead>
          <TableHead>Appointments</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.month}</TableCell>
            <TableCell className="text-left">{invoice.numberOfAppointments}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default AppointmentSummary;
