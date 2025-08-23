import { useCallback, useEffect } from "react";

import { Button, Input, Select, RTE } from "../index"
import databaseService from "../../services/database"
import storageService from "../../services/storage"

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, getValues, control, formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active"
        }
    })

    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await storageService.uploadFile(data.image[0]) : null
            if (file) {
                storageService.deleteFile(post.featuredImage)
            }
            const dbPost = await databaseService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : null
            })
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        } else {
            const file = data.image[0] ? await storageService.uploadFile(data.image[0]) : null
            if (file) {
                data.featuredImage = file.$id
                const dbPost = await databaseService.createPost({ ...data, userId: userData.$id })
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/\s/g, '-')

        return ""
    }, [])

    useEffect(() => {
        const subscription = watch((value, name) => {
            if(name === "title") {
                setValue("slug", slugTransform(value.title), {shouldValidate: true})
            }
        })
        return () => {
            subscription.unsubscribe()
        }
    }, [watch, slugTransform, setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", {
                        required: "This field is Required",
                        maxLength: {
                            value: 255,
                            message: "Title must not exceed 255 characters."
                        }
                    })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })
                    }}
                />
                <p className="text-red-600">{errors.title?.message}</p>
                <Input
                    label="Slug"
                    placeholder="Slug"
                    className="mb-4"
                    readOnly
                    {...register("slug", {
                        required: "This field is Required"
                    })}
                />
                <RTE label="Content" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: false })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={storageService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", {
                        required: "Select one of the status"
                    })}
                />
                <p className="text-red-600">{errors.status?.message}</p>
                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500" : undefined}
                    className="w-full"
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}