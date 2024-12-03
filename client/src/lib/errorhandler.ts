// import { JWSInvalid } from "jose/errors";
import { ZodError } from "zod";

export class HttpError extends Error {
  status: number;

  constructor(message: string = "Internal Server Error", status: number = 500) {
    super(message);
    this.name = "HttpError"; // Set the error name
    this.status = status;
  }
}

export function handleError(error: unknown) {
  // console.log(error);

  if (error instanceof ZodError) {
    return new Response(
      JSON.stringify({ message: error.issues[0].message }),
      { status: 400 } // Bad Request
    );
  } else if (error instanceof HttpError) {
    return Response.json(
      {
        message: error.message,
      },
      { status: error.status }
    );
  } 
//   else if (error instanceof JWSInvalid) {
//     return Response.json(
//       {
//         message: "Invalid Token",
//       },
//       { status: 401 }
//     );
//   }
  return Response.json(
    {
      message: "Internal Server Error",
    },
    { status: 500 }
  );
}
