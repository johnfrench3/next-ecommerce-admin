"use client";

import * as z from "zod"
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Category, Product } from "@prisma/client";

import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useProductModal } from "@/hooks/use-product-modal";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage
} from "@/components/ui/form";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(1),
});

export const ProductModal = () => {
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<Product>();
  const [categories, setCategories] = useState<Category[]>([]);
  const productModal = useProductModal();
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await axios.get(`/api/${params.storeId}/products/${productModal.editId}`);
      setInitialData(response.data);
      setLoading(false);
    }

    const fetchCategories = async () => {
      setLoading(true);
      const response = await axios.get(`/api/${params.storeId}/categories`);
      setCategories(response.data);
      setLoading(false);
    }
  
    if (productModal.isEdit) {
      fetchData();
    }

    fetchCategories();
  }, [params.storeId, productModal.editId, productModal.isEdit]);

  const title = productModal.isEdit ? 'Edit product' : 'Create product';
  const description = productModal.isEdit ? 'Edit a product.' : 'Add a new product';
  const toastMessage = productModal.isEdit ? 'Product updated.' : 'Product created.';

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name,
      price: parseFloat(String(initialData?.price)),
      categoryId: initialData?.categoryId,
    },
  });

  useEffect(() => { 
    form.reset({ 
      name: initialData?.name,
      price: parseFloat(String(initialData?.price)),
      categoryId: initialData?.categoryId,
    });
  }, [initialData?.id, initialData?.name, initialData?.categoryId, initialData?.price, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    const data = {
      ...values,
      id: productModal.editId,
    };

    if (productModal.isEdit) {
      await axios.patch(`/api/${params.storeId}/products`, data);
    } else {
      await axios.post(`/api/${params.storeId}/products`, data);
    }

    setLoading(false);
    toast.success(toastMessage);
    router.refresh();
    productModal.onClose();
  };

  return (
    <Modal
      title={title}
      description={description}
      isOpen={productModal.isOpen} 
      onClose={productModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="T-Shirt" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" disabled={loading} placeholder="9.99" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button disabled={loading} variant="outline" onClick={productModal.onClose}>
                  Cancel
                </Button>
                <Button disabled={loading} type="submit">Continue</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
