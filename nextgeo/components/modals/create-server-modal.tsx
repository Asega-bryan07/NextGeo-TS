"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
} from "../ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "../ui/form";
import {Input} from "../ui/input";
import { Button } from "../ui/button";
import { FileUpload } from "../file-upload";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-model-store";


const formSchema = z.object({
    name: z.string().min(1, {
        message: "Server Name is Required!"
    }),
    imageUrl: z.string().min(1, {
        message: "Server Image is Required"
    })
});

export const CreateServerModal = () => {
    const { isOpen, onClose, type } = useModal();
    const router = useRouter();

    const isModalOpen = isOpen && type === "createServer";

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            imageUrl: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            
            axios.post("/api/servers", values); //await.axios

            form.reset();
            router.refresh();
        } catch (error) {
            console.log(error);
        }

    }
    const handleClose = () => {
        form.reset();
        onClose();
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white p-0 text-black overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Customize Server
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Give your server a personality with a name and an image.

                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="space-y-8 px-6">
                        <div className="flex item-center justify-center text-center">
                            <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => <FormItem>
                                <FormControl>
                                    <FileUpload 
                                    endpoint="serverImage"
                                    value={field.value}
                                    onChange={field.onChange}
                                    />
                                </FormControl>
                            </FormItem>}
                            />
                        </div>

                        <FormField control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="uppercase text-xs font-bold text-zinc-500
                                dark:text-secondary/70">
                                    Server Name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                    disabled={isLoading}
                                    className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                    placeholder="Enter Server Name"
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                    </div>
                    <DialogFooter className="bg-gray-100 px-6 py-4">
                        <Button variant={"primary"} disabled={isLoading}>
                            Create
                        </Button>
                    </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
     );
}
 
// export default InitialModal;