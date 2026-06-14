import cloudinary from "@/app/lib/cloudinary";

export async function POST(req) {
    try {
        const formData = await req.formData();

        const file = formData.get("file");

        if (!file) {
            return Response.json(
                { message: "No file uploaded" },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload_stream(
                    {
                        folder: "kickxwear",
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                )
                .end(buffer);
        });

        return Response.json(result);
    } catch (error) {
        console.error(error);

        return Response.json(
            { message: "Upload failed" },
            { status: 500 }
        );
    }
}

export async function DELETE(req) {
  try {
    const { public_id } = await req.json();

    if (!public_id) {
      return Response.json(
        { message: "public_id is required" },
        { status: 400 }
      );
    }

    const result = await cloudinary.uploader.destroy(
      public_id
    );

    return Response.json(
      {
        message: "Image deleted successfully",
        result,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return Response.json(
      { message: "Failed to delete image" },
      { status: 500 }
    );
  }
}