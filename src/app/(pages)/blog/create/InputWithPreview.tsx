"use client"

import * as React from "react"
import { PlusCircle } from "lucide-react"
import Image from "next/image";

export interface InteractiveImageInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
    onImageChange?: (file: File | null) => void
    initialImage?: any
}

const InteractiveImageInput = React.forwardRef<HTMLInputElement, InteractiveImageInputProps>(
    ({ className, onImageChange, initialImage, ...props }, ref) => {
        const [preview, setPreview] = React.useState<string | null>(initialImage || null)
        const internalRef = React.useRef<HTMLInputElement>(null)

        React.useImperativeHandle(ref, () => internalRef.current as HTMLInputElement)

        const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0] || null
            if (file) {
                const reader = new FileReader()
                reader.onloadend = () => {
                    setPreview(reader.result as string)
                }
                reader.readAsDataURL(file)
            } else {
                setPreview(null)
            }
            if (onImageChange) {
                onImageChange(file)
            }
        }

        const handleClick = () => {
            internalRef.current?.click()
        }

        return (
            <div className="relative">
                <div
                    className="relative aspect-[16/9] w-full cursor-pointer overflow-hidden rounded-lg border border-input bg-background"
                    onClick={handleClick}
                >
                    {preview ? (
                        <Image
                            src={preview || "/placeholder.svg"}
                            alt="Preview"
                            className="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-50"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-muted">
                            <PlusCircle className="h-12 w-12 text-muted-foreground" />
                        </div>
                    )}
                    <div
                        className={`absolute inset-0 flex items-center justify-center bg-background/50 transition-opacity duration-300 ${preview ? "opacity-0 hover:opacity-100" : "opacity-100"}`}
                    >
                        {!preview && <PlusCircle className="h-12 w-12 text-muted-foreground" />}
                    </div>
                </div>
                <input
                    type="file"
                    ref={internalRef}
                    className="hidden"
                    onChange={handleImageChange}
                    accept="image/*"
                    {...props}
                />
            </div>
        )
    },
)
InteractiveImageInput.displayName = "InteractiveImageInput"

export { InteractiveImageInput }

