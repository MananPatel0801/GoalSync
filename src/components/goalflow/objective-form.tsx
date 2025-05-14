"use client";

import * as React from 'react';
import type { KeyResult, Objective } from '@/types/okr';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const keyResultSchema = z.object({
  id: z.string().optional(),
  description: z.string().min(3, 'Description must be at least 3 characters'),
  progress: z.number().min(0).max(100),
});

const objectiveSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, 'Title must be at least 3 characters'),
  period: z.enum(['Weekly', 'Monthly']),
  keyResults: z.array(keyResultSchema).min(1, 'Add at least one key result'),
});

type ObjectiveFormData = z.infer<typeof objectiveSchema>;

interface ObjectiveFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Objective) => void;
  initialData?: Objective | null;
}

export default function ObjectiveForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: ObjectiveFormProps) {
  const { toast } = useToast();
  const form = useForm<ObjectiveFormData>({
    resolver: zodResolver(objectiveSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          keyResults: initialData.keyResults.map(kr => ({...kr})) // ensure deep copy
        }
      : {
          title: '',
          period: 'Weekly',
          keyResults: [{ description: '', progress: 0 }],
        },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'keyResults',
  });

  const handleFormSubmit = (data: ObjectiveFormData) => {
    const objectiveToSubmit: Objective = {
      ...data,
      id: initialData?.id || crypto.randomUUID(),
      status: initialData?.status || 'To Do',
      createdAt: initialData?.createdAt || new Date().toISOString(),
      keyResults: data.keyResults.map((kr) => ({
        ...kr,
        id: kr.id || crypto.randomUUID(),
      })),
    };
    onSubmit(objectiveToSubmit);
    toast({
      title: initialData ? 'Objective Updated' : 'Objective Created',
      description: `Objective "${data.title}" has been successfully ${initialData ? 'updated' : 'saved'}.`,
    });
    form.reset({ title: '', period: 'Weekly', keyResults: [{ description: '', progress: 0 }] }); // Reset form after submission
    onClose();
  };

  React.useEffect(() => {
    if (initialData) {
      form.reset({
        ...initialData,
        keyResults: initialData.keyResults.map(kr => ({...kr}))
      });
    } else {
      form.reset({ title: '', period: 'Weekly', keyResults: [{ description: '', progress: 0 }] });
    }
  }, [initialData, form, isOpen]);


  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Objective' : 'Create New Objective'}</DialogTitle>
          <DialogDescription>
            Set your objective and define key results to track your progress.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Objective Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Increase user engagement" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="period"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Period</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Weekly">Weekly</SelectItem>
                      <SelectItem value="Monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormLabel>Key Results</FormLabel>
              {fields.map((item, index) => (
                <div key={item.id} className="p-4 border rounded-md space-y-3 bg-muted/50">
                  <FormField
                    control={form.control}
                    name={`keyResults.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>KR #{index + 1} Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="e.g., Publish 3 blog posts" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`keyResults.${index}.progress`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>KR #{index + 1} Progress: {field.value}%</FormLabel>
                        <FormControl>
                          <Slider
                            defaultValue={[field.value]}
                            max={100}
                            step={1}
                            onValueChange={(value) => field.onChange(value[0])}
                            className="[&>span>span]:bg-[hsl(var(--custom-yellow))]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {fields.length > 1 && (
                     <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => remove(index)}
                        className="mt-2"
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Remove KR
                      </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ description: '', progress: 0 })}
                className="mt-2"
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Add Key Result
              </Button>
               <FormField
                control={form.control}
                name="keyResults"
                render={() => ( <FormMessage /> )} // To show array-level errors like min(1)
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
              <Button type="submit" className="bg-[hsl(var(--custom-yellow))] text-[hsl(var(--custom-yellow-foreground))] hover:bg-[hsl(var(--custom-yellow))]/90">
                {initialData ? 'Save Changes' : 'Create Objective'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
