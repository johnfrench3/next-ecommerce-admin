"use client";

import * as z from "zod"
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCategoryModal } from "@/hooks/use-category-modal";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { Category } from "@prisma/client";

const formSchema = z.object({
  name: z.string().min(2),
});

export const CategoryModal = () => {
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<Category>();
  const categoryModal = useCategoryModal();
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await axios.get(`/api/${params.storeId}/categories/${categoryModal.editId}`);
      setInitialData(response.data);
      setLoading(false);
    }
  
    if (categoryModal.isEdit) {
      fetchData();
    }
  }, [params.storeId, categoryModal.editId, categoryModal.isEdit]);

  const title = categoryModal.isEdit ? 'Edit category' : 'Create category';
  const description = categoryModal.isEdit ? 'Edit a category.' : 'Add a new category';
  const toastMessage = categoryModal.isEdit ? 'Category updated.' : 'Category created.';

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name,
    },
  });

  useEffect(() => { 
    form.reset({ name: initialData?.name });
  }, [initialData?.id, initialData?.name, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    const data = {
      ...values,
      id: categoryModal.editId,
    };

    if (categoryModal.isEdit) {
      await axios.patch(`/api/${params.storeId}/categories`, data);
    } else {
      await axios.post(`/api/${params.storeId}/categories`, data);
    }

    setLoading(false);
    toast.success(toastMessage);
    router.refresh();
    categoryModal.onClose();
  };

  return (
    <Modal
      title={title}
      description={description}
      isOpen={categoryModal.isOpen} 
      onClose={categoryModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input disabled={loading} placeholder="E-Commerce" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                  <Button disabled={loading} variant="outline" onClick={categoryModal.onClose}>
                    Cancel
                  </Button>
                  <Button disabled={loading} type="submit">Continue</Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Modal>
  );
};
