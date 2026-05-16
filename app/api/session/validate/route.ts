import { AxiosError } from "axios";
import axios from "axios";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import apiEndpoints from "@/utils/endpoints";
import { isServerUnavailableStatus } from "@/utils/axiosInstance";
import axiosInstance from "@/utils/axiosInstance";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return Response.json(
      { ok: false, error: "UNAUTHENTICATED" },
      { status: 401 },
    );
  }

  try {
    await axiosInstance.get(apiEndpoints.authentication.me);

    return Response.json({ ok: true });
  } catch (error: unknown) {
    const status =
      error instanceof AxiosError ? error.response?.status : undefined;

    if (!status || isServerUnavailableStatus(status)) {
      return Response.json(
        { ok: false, error: "SERVER_UNREACHABLE" },
        { status: 503 },
      );
    }

    return Response.json(
      {
        ok: false,
        error: status === 401 ? "UNAUTHENTICATED" : "SESSION_INVALID",
      },
      { status },
    );
  }
}
