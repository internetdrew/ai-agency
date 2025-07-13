import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Persona } from "@/routes/Personas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormLabel,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormDescription,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface CreatePersonaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPersonaCreated: React.Dispatch<React.SetStateAction<Persona[]>>;
}

const formSchema = z.object({
  type: z
    .string()
    .min(2, {
      message: "Persona names should be at least 2 characters.",
    })
    .max(50, {
      message: "Persona names should be less than 50 characters.",
    }),
});

const CreatePersonaDialog = ({
  open,
  onOpenChange,
  onPersonaCreated,
}: CreatePersonaDialogProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onPersonaCreated((prev: Persona[]) => [...prev, { type: values.type }]);
    onOpenChange(false);
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Persona</DialogTitle>
          <DialogDescription>
            Accurate personas are the foundation of your product. They help you
            understand your users and their needs. Lets start with the basics.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Persona Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Startup Founder" {...field} />
                  </FormControl>
                  <FormDescription>
                    We'll use this name to identify the persona around the app.
                    Keep it simple and easy to distinguish.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit">Create</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePersonaDialog;
