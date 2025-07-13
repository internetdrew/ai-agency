import CreatePersonaDialog from "@/components/CreatePersonaDialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

const Personas = () => {
  const [renderPersonaDialog, setRenderPersonaDialog] = useState(false);

  return (
    <>
      <div className="p-4 pt-0">
        <div className="flex items-center justify-between">
          <h1 className="mb-4 text-2xl font-bold">Personas</h1>
          <Button
            variant="outline"
            onClick={() => setRenderPersonaDialog(true)}
          >
            <PlusIcon className="h-4 w-4" />
            Add Persona
          </Button>
        </div>
      </div>
      <CreatePersonaDialog
        open={renderPersonaDialog}
        onOpenChange={setRenderPersonaDialog}
      />
    </>
  );
};

export default Personas;
