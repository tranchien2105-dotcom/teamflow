<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCertificateRequest;
use App\Http\Requests\UpdateCertificateRequest;
use App\Http\Resources\CertificateResource;
use App\Models\Certificate;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CertificateController extends Controller
{
    /**
     * List certificates of current user.
     */
    public function index(Request $request): JsonResponse
    {
        $certificates = Certificate::query()
            ->where('user_id', $request->user()->id)
            ->latest('issue_date')
            ->get();

        return response()->json([
            'data' => CertificateResource::collection($certificates),
        ]);
    }

    /**
     * Create certificate.
     */
    public function store(
        StoreCertificateRequest $request
    ): JsonResponse {
        $certificate = Certificate::create([
            ...$request->validated(),
            'user_id' => $request->user()->id,
        ]);

        return response()->json([
            'message' => 'Certificate created successfully.',
            'data' => new CertificateResource($certificate),
        ], 201);
    }

    /**
     * Show certificate.
     */
    public function show(
        Request $request,
        Certificate $certificate
    ): JsonResponse {
        abort_unless(
            $certificate->user_id === $request->user()->id,
            404
        );

        return response()->json([
            'data' => new CertificateResource($certificate),
        ]);
    }

    /**
     * Update certificate.
     */
    public function update(
        UpdateCertificateRequest $request,
        Certificate $certificate
    ): JsonResponse {
        abort_unless(
            $certificate->user_id === $request->user()->id,
            404
        );

        $certificate->update(
            $request->validated()
        );

        return response()->json([
            'message' => 'Certificate updated successfully.',
            'data' => new CertificateResource(
                $certificate->fresh()
            ),
        ]);
    }

    /**
     * Delete certificate.
     */
    public function destroy(
        Request $request,
        Certificate $certificate
    ): JsonResponse {
        abort_unless(
            $certificate->user_id === $request->user()->id,
            404
        );

        $certificate->delete();

        return response()->json([
            'message' => 'Certificate deleted successfully.',
        ]);
    }
}
