import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { SystemInfo } from './SystemInfo';
import { WorkflowDiagram } from './WorkflowDiagram';
import { HelpCircle } from 'lucide-react';

interface HelpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HelpDialog({ open, onOpenChange }: HelpDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            System Documentation & Help
          </DialogTitle>
          <DialogDescription>
            Learn about the system features, workflows, and how to use the platform
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="features" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="features">Features & Overview</TabsTrigger>
            <TabsTrigger value="workflow">Workflow & Process</TabsTrigger>
          </TabsList>

          <TabsContent value="features" className="mt-4">
            <SystemInfo />
          </TabsContent>

          <TabsContent value="workflow" className="mt-4">
            <WorkflowDiagram />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
