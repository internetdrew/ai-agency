import CreatePersonaDialog from "@/components/CreatePersonaDialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
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

export interface Persona {
  type: string;
  description: string;
}

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
  const [renderPersonaDialog, setRenderPersonaDialog] = useState(false);
  const [personas, setPersonas] = useState<Persona[]>([]);

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
        {personas.map((persona) => (
          <Card key={persona.type}>
            <CardHeader>
              <CardTitle>{persona.type}</CardTitle>
              <CardDescription>
                <span>{persona.description}</span>
                <br />
                <br />
                Help us learn more about {persona.type} from your perspective.
                If you look below, you'll see some important things we can chat
                about. If you don't have a description, just say "No description
                yet".
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
        onPersonaCreated={setPersonas}
      />
    </>
  );
};

export default Personas;
