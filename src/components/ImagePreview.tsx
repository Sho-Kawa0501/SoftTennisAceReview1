import React,{ForwardRefRenderFunction} from "react";
import Image from "next/image"
import { useFormContext } from "react-hook-form";

interface ImagePreviewProps {
  imagePreviewUrl: string | null;
}

const ImagePreview:React.ForwardRefRenderFunction<HTMLDivElement, ImagePreviewProps> = 
({ imagePreviewUrl }, ref) => {
  if (!imagePreviewUrl) {
    return null;
  }
  const { register, formState: { errors } } = useFormContext()
  return (
    <>
     {/* <div ref={ref}> */}
      <div className="mb-1">プレビュー画像</div>
      <Image 
        src={imagePreviewUrl}
        alt="プレビュー画像"
        width={800}
        height={800}
      />
    {/* </div> */}
    </>
  )
}

export default React.forwardRef(ImagePreview)

// import React from "react";
// import Image from "next/image"
// import { useFormContext, useWatch } from "react-hook-form";

// const ImagePreview: React.FC = () => {
//   const { control } = useFormContext();
  
//   // useFormContextとuseWatchを使用してimagePreviewUrlを取得する
//   const imagePreviewUrl = useWatch({
//     control,
//     name: "image", // 監視するフィールドの名前
//     defaultValue: "" // デフォルトの値（任意）
//   }); 

//   if (!imagePreviewUrl) {
//     return null;
//   }

//   return (
//     <>
//       <div className="mb-1">プレビュー画像</div>
//       <Image 
//         src={imagePreviewUrl}
//         alt="プレビュー画像"
//         width={800}
//         height={800}
//       />
//     </>
//   )
// }

// export default ImagePreview;
