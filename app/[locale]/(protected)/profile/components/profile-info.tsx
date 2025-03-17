'use client';

import { editUserProfile } from '@/actions/user';
import { LogoutButton } from '@/components/auth/logout-button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import DatePicker from '@/components/ui/date-picker';
import { Form, FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { goalIcons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import LanguageSelector from '@/components/ui/language-selector';
import { LoadingButton } from '@/components/ui/loading/loading-button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { formatDate, getAgeFromBirthDate } from '@/lib/date-util';
import { useDateLocale } from '@/lib/hooks/date-format';
import { useCurrentUser } from '@/lib/hooks/use-current-user';
import { updateUserSession } from '@/lib/update-session';
import { EditUserProfileSchema, EditUserProfileSchemaType } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Goal } from '@prisma/client';
import { Lock, LogOut } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import EditableField from './editable-field';

const ProfileInfo = () => {
    const { data: session, update } = useSession();
    const user = useCurrentUser();

    const form = useForm<EditUserProfileSchemaType>({
        resolver: zodResolver(EditUserProfileSchema),
        defaultValues: {
            name: user?.name,
            birthDate: user?.birthDate || undefined,
            gender: user?.gender,
            activityLevel: user?.activityLevel || undefined,
            goal: user?.goal,
            height: user?.height || undefined,
        },
    });

    const t = useTranslations("ProfilePage");
    const enumTranslation = useTranslations("Enum");
    const dateLocale = useDateLocale();

    const [editMode, setEditMode] = useState(false);
    const [isPending, startTransition] = useTransition();

    const onSubmit = (values: EditUserProfileSchemaType) => {
        startTransition(() => {
            editUserProfile(values)
                .then(async (data) => {
                    if (data.success) {
                        await updateUserSession(data.updatedUser, update, session);
                        setEditMode(false);
                        toast.success(t("successOperation"));
                    } else {
                        toast.error(data.error);
                    }
                })
                .catch(err => {
                    console.error(err.message);
                    toast.error(err.message);
                })
        });
    }

    if (!user) {
        return notFound();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Card>
                    <CardHeader className="gap-4 relative">
                        <div className='flex justify-between'>
                            <LanguageSelector />
                            <div className="flex items-center space-x-2 justify-end">
                                <Switch id="edit-mode" checked={editMode} onCheckedChange={setEditMode} />
                                <Label htmlFor="edit-mode" className="cursor-pointer">{t("editMode")}</Label>
                            </div>
                        </div>
                        <Avatar className="w-16 h-16 border-2 border-gray-300">
                            <AvatarImage src={user.image || undefined} alt='UserLogo' />
                            <AvatarFallback className="text-xl font-semibold">{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                            <EditableField
                                editMode={editMode}
                                name="name"
                                control={form.control}
                                value={user.name}
                                className="text-2xl font-bold text-gray-800"
                                formItem={(field) => (
                                    <FormControl>
                                        <Input {...field}
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                )}
                            />
                            {!editMode && <p className="text-gray-500 text-sm pl-2">{user.email}</p>}

                        </div>
                    </CardHeader>
                    <CardContent>
                        {user.birthDate &&
                            <EditableField
                                editMode={editMode}
                                label={t("birthDateLabel")}
                                name="birthDate"
                                control={form.control}
                                value={`${formatDate(user.birthDate, dateLocale)} (${getAgeFromBirthDate(user.birthDate)} ${t("years")})`}
                                formItem={(field) => (
                                    <DatePicker
                                        {...field}
                                        invalid={!!form.formState.errors.birthDate}
                                    />
                                )}
                            />
                        }

                        <EditableField
                            editMode={editMode}
                            label={enumTranslation("gender.label")}
                            name="gender"
                            control={form.control}
                            value={enumTranslation(`gender.${user.gender}`)}
                            formItem={(field) => (
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="male" />
                                            </FormControl>
                                            <FormLabel className="font-normal cursor-pointer">
                                                {enumTranslation("gender.male")}
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="female" />
                                            </FormControl>
                                            <FormLabel className="font-normal cursor-pointer">
                                                {enumTranslation("gender.female")}
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                            )}
                        />

                        <EditableField
                            editMode={editMode}
                            label={t("heightLabel")}
                            name="height"
                            control={form.control}
                            value={user.height?.toString()}
                            className="font-bold text-gray-800"
                            formItem={(field) => (
                                <FormControl>
                                    <Input {...field}
                                        disabled={isPending}
                                    />
                                </FormControl>
                            )}
                        />

                        <EditableField
                            editMode={editMode}
                            label={enumTranslation("activityLevel.label")}
                            name="activityLevel"
                            control={form.control}
                            value={enumTranslation(`activityLevel.${user.activityLevel?.toString().replace(".", "-")}-short`)}
                            formItem={(field) => (
                                <Select {...field} value={field.value.toString()} disabled={isPending} onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                    <FormControl>
                                        <SelectTrigger className="w-full border p-2 rounded">
                                            <SelectValue />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="1.2">{enumTranslation("activityLevel.1-2")}</SelectItem>
                                        <SelectItem value="1.375">{enumTranslation("activityLevel.1-375")}</SelectItem>
                                        <SelectItem value="1.55">{enumTranslation("activityLevel.1-55")}</SelectItem>
                                        <SelectItem value="1.725">{enumTranslation("activityLevel.1-725")}</SelectItem>
                                        <SelectItem value="1.9">{enumTranslation("activityLevel.1-9")}</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />

                        <EditableField
                            editMode={editMode}
                            label={enumTranslation("goal.label")}
                            name="goal"
                            control={form.control}
                            value={enumTranslation(`goal.${user.goal}-short`)}
                            formItem={(field) => (
                                <Select {...field} disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-full border p-2 rounded">
                                            <SelectValue />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {(Object.values(Goal) as Goal[]).map((goal) => {
                                            const Icon = goalIcons[goal];
                                            return (
                                                <SelectItem key={goal} value={goal}>
                                                    {enumTranslation(`goal.${goal}`)}
                                                    <Icon className="w-4 h-4 inline-block ml-2" />
                                                </SelectItem>
                                            );
                                        })}
                                    </SelectContent>
                                </Select>
                            )}
                        />

                    </CardContent>
                    <CardFooter className="flex flex-col justify-center">
                        {editMode &&
                            <div className="flex items-center gap-2">
                                <Button
                                    type="reset"
                                    variant='outline'
                                    onClick={() => {
                                        form.reset();
                                        setEditMode(false);
                                    }}>
                                    {t("resetButton")}
                                </Button>
                                <LoadingButton type="submit" isLoading={isPending}>
                                    {t("saveButton")}
                                </LoadingButton>
                            </div>
                        }
                        {!user.isOAuth &&
                            <Button
                                size="sm"
                                variant="link"
                                asChild
                                className="px-0 font-normal"
                            >
                                <Link href="/auth/reset">
                                    <Lock />{t("resetPasswordButton")}
                                </Link>
                            </Button>
                        }
                        {!editMode && <LogoutButton>
                            <Button
                                variant="link"
                                type='button'
                            >
                                <LogOut />
                                {t("logout")}
                            </Button>
                        </LogoutButton>
                        }
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
}

export default ProfileInfo;