import { useCallback } from "react";

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

    }

    const slugTransform = () => {

    }

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
                />
                <p className="text-red-600">{errors.title?.message}</p>
                <Input
                    label="Slug"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("title", {
                        required: "This field is Required"
                    })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })
                    }}
                />
                <RTE label="Content" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
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