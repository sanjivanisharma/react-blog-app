import { useCallback, useEffect, useState } from "react";

import { createPostStore, updatePostStore } from "../../store/postSlice";
import { Button, Input, Select, RTE } from "../index"
import databaseService from "../../services/database"
import storageService from "../../services/storage"

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, getValues, control, formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active"
        }
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)

    const submit = async (data) => {
        if (post) {
            try {
                setLoading(true)
                const file = data.image[0] ? await storageService.uploadFile(data.image[0]) : null
                if (file) {
                    storageService.deleteFile(post.featuredImage)
                }
                const dbPost = await databaseService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : post.featuredImage
                })
                if (dbPost) {
                    dispatch(updatePostStore({ post: dbPost }))
                    navigate(`/post/${dbPost.$id}`)
                }
            } catch (err) {
                setError(err.message)
                console.log(err)
                throw err
            } finally {
                setLoading(false)
            }
        } else {
            try {
                setLoading(true)
                data.slug = data.slug + "-" + Date.now()
                const file = data.image[0] ? await storageService.uploadFile(data.image[0]) : null
                data.featuredImage = file ? file.$id : null
                const dbPost = await databaseService.createPost({ ...data, userId: userData.$id })
                if (dbPost) {
                    dispatch(createPostStore({ post: dbPost }))
                    navigate(`/post/${dbPost.$id}`)
                }
            } catch (err) {
                setError(err.message)
                console.log(err)
                throw err
            } finally {
                setLoading(false)
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
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true })
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
                <p className="text-red-600 mt-2">{errors.content?.message}</p>
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: post ? false : "This field is Required" })}
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
                <p className="text-red-600 mb-4">{errors.image?.message}</p>
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
                    className="w-full flex items-center justify-center gap-2"
                >
                    {post ? "Update" : "Submit"}
                    {loading &&
                        <ClipLoader
                            color="white"
                            loading={loading}
                            size={18}
                            aria-label="Loading Spinner"
                        />}
                </Button>
                {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
            </div>
        </form>
    )
}