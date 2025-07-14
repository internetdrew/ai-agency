import CreatePersonaDialog from "@/components/CreatePersonaDialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useActiveClient } from "@/contexts/ActiveClient";
import { trpc } from "@/utils/trpc";
import { useQuery } from "@tanstack/react-query";
import {
  Activity,
  Brain,
  Frown,
  Handshake,
  MessageCircle,
  PlusIcon,
  Shield,
  Target,
} from "lucide-react";
import { useState } from "react";

const personaFields = [
  {
    icon: Target,
    label: "Goals",
    status: "Incomplete",
  },
  {
    icon: MessageCircle,
    label: "Their Words for the Problem",
    status: "Incomplete",
  },
  {
    icon: Frown,
    label: "Frustrations",
    status: "Incomplete",
  },
  {
    icon: Shield,
    label: "Common Hesitations",
    status: "Incomplete",
  },
  {
    icon: Brain,
    label: "Decision Factors",
    status: "Incomplete",
  },
  {
    icon: Handshake,
    label: "What Builds Trust Early",
    status: "Incomplete",
  },
  {
    icon: Activity,
    label: "Conversion Triggers",
    status: "Incomplete",
  },
];

const Personas = () => {
  const { activeClient } = useActiveClient();
  const [renderPersonaDialog, setRenderPersonaDialog] = useState(false);

  const { data: personas } = useQuery(
    trpc.personas.list.queryOptions(
      { clientId: activeClient?.id ?? 0 },
      { enabled: !!activeClient },
    ),
  );

  return (
    <>
      <div className="p-4 pt-0">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Personas</h1>
          <Button
            variant="outline"
            onClick={() => setRenderPersonaDialog(true)}
          >
            <PlusIcon className="h-4 w-4" />
            Add Persona
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 p-4 pt-0 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {personas?.map((persona) => (
          <Card key={persona.id}>
            <CardHeader>
              <CardTitle>{persona.name}</CardTitle>
              <CardDescription>
                <span>{persona.description}</span>
                <br />
                <br />
                Help us learn more about {persona.name} from your perspective.
                If you look below, you'll see some important things we can chat
                about.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                {personaFields.map((field) => {
                  const IconComponent = field.icon;
                  return (
                    <Button
                      key={field.label}
                      variant="outline"
                      className="w-full justify-between"
                    >
                      <span className="flex max-w-[80%] items-center gap-1">
                        <IconComponent className="text-muted-foreground size-3" />
                        <span>{field.label}</span>
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {field.status}
                      </span>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
            {/* <CardFooter>
              <p>Card Footer</p>
            </CardFooter> */}
          </Card>
        ))}
      </div>
      <CreatePersonaDialog
        open={renderPersonaDialog}
        onOpenChange={setRenderPersonaDialog}
      />
    </>
  );
};

export default Personas;
