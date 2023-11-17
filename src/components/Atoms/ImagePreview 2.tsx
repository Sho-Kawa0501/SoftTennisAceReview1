import React,{ForwardRefRenderFunction} from "react";
import Image from "next/image"
import { useFormContext,useWatch } from "react-hook-form";

interface ImagePreviewProps {
  imagePreviewUrl: string | null;
}

const ImagePreviewComponent: React.ForwardRefRenderFunction<HTMLDivElement> = (_,ref) => {
  const { control,getValues } = useFormContext();
    const imagePreviewUrl = useWatch({
      control,
      name: 'image',
      defaultValue: getValues('image'),
    });
     console.log("imgPU"+imagePreviewUrl)

  if (!imagePreviewUrl) {
    return null;
  }

  return (
    <>
    <div ref={ref}>
      <div className="mb-1">プレビュー画像</div>
      <Image 
        src={imagePreviewUrl}
        alt="プレビュー画像"
        width={800}
        height={800}
      />
    </div>
    </>
  )
}

ImagePreviewComponent.displayName = "ImagePreviewComponent"
const ImagePreview = React.forwardRef(ImagePreviewComponent);
export default React.memo(ImagePreview);