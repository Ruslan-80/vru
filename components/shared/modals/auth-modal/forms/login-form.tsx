import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { formLoginSchema, TFormLoginValues } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui";

interface Props {
    onClose?: VoidFunction;
}

export const LoginForm: React.FC = () => {
    const form = useForm<TFormLoginValues>({
        resolver: zodResolver(formLoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (data: TFormLoginValues) => {
        console.log(data);
    };

    return (
        <FormProvider {...form}>
            <form
                className="flex flex-col gap-5"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="flex justify-between items-center">
                    <div className="mr-2">
                        <div className="text-2xl font-bold">Вход в аккаунт</div>

                        <p className="text-gray-400">
                            Введите свою почту, чтобы войти в свой аккаунт
                        </p>
                    </div>
                    <img
                        src="/assets/images/phone-icon.png"
                        alt="phone-icon"
                        width={60}
                        height={60}
                    />
                </div>

                <input
                    name="email"
                    // label="E-Mail"
                    required
                />
                <input
                    type="password"
                    name="password"
                    // label="Пароль"
                    required
                />

                <Button
                    disabled={form.formState.isSubmitting}
                    className="h-12 text-base"
                    type="submit"
                >
                    {form.formState.isSubmitting ? "Вход..." : "Войти"}
                </Button>
            </form>
        </FormProvider>
    );
};
