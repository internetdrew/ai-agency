import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Textarea } from "./ui/textarea";
import { useEffect } from "react";
import { useActiveClient } from "@/contexts/ActiveClient";
import { queryClient, trpc } from "@/utils/trpc";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface CreatePersonaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Persona names should be at least 2 characters.",
    })
    .max(50, {
      message: "Persona names should be less than 50 characters.",
    }),
  description: z
    .string()
    .min(2, {
      message: "Description should be at least 2 characters.",
    })
    .max(200, {
      message: "Description should be less than 200 characters.",
    }),
});

const CreatePersonaDialog = ({
  open,
  onOpenChange,
}: CreatePersonaDialogProps) => {
  const { activeClient } = useActiveClient();

  const personaCreationMutation = useMutation(
    trpc.personas.create.mutationOptions(),
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!activeClient) return;

    await personaCreationMutation.mutateAsync(
      {
        name: values.name,
        description: values.description,
        clientId: activeClient.id,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: trpc.personas.list.queryKey(),
          });
          onOpenChange(false);
          toast.success("Persona created successfully");
        },
        onError: (error) => {
          console.error(error);
          toast.error("Failed to create persona. Please try again.");
        },
      },
    );
  }

  useEffect(() => {
    form.reset();
  }, [form, form.formState.isSubmitSuccessful]);

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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Persona Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Startup Founders" {...field} />
                  </FormControl>
                  <FormDescription>
                    We'll use this name to identify the persona around the app.
                    Keep it simple and easy to distinguish.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., High-growth founders with Series A+ funding, 10+ employees, scaling rapidly"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Add context about this specific persona. Don't worry about
                    making it polished. Our AI will clean up the description so
                    it's concise and punchy.
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
