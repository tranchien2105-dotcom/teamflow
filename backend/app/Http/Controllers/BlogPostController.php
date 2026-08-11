<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBlogPostRequest;
use App\Http\Requests\UpdateBlogPostRequest;
use App\Http\Resources\BlogPostResource;
use App\Models\BlogPost;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BlogPostController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = BlogPost::query();

        if ($request->user()->role !== 'admin') {
            $query->where(
                'user_id',
                $request->user()->id
            );
        }

        $posts = $query
            ->latest()
            ->paginate(10);

        return response()->json([
            'data' => BlogPostResource::collection($posts),
            'meta' => [
                'current_page' => $posts->currentPage(),
                'last_page' => $posts->lastPage(),
                'per_page' => $posts->perPage(),
                'total' => $posts->total(),
            ],
        ]);
    }

    public function store(
        StoreBlogPostRequest $request
    ): JsonResponse {
        $post = BlogPost::create([
            ...$request->validated(),
            'user_id' => $request->user()->id,
        ]);

        return response()->json([
            'message' => 'Blog post created successfully.',
            'data' => new BlogPostResource($post),
        ], 201);
    }

    public function show(
        BlogPost $blogPost
    ): JsonResponse {
        $this->authorize(
            'view',
            $blogPost
        );

        return response()->json([
            'data' => new BlogPostResource($blogPost),
        ]);
    }

    public function update(
        UpdateBlogPostRequest $request,
        BlogPost $blogPost
    ): JsonResponse {
        $this->authorize(
            'update',
            $blogPost
        );

        $blogPost->update(
            $request->validated()
        );

        return response()->json([
            'message' => 'Blog post updated successfully.',
            'data' => new BlogPostResource(
                $blogPost->fresh()
            ),
        ]);
    }

    public function destroy(
        BlogPost $blogPost
    ): JsonResponse {
        $this->authorize(
            'delete',
            $blogPost
        );

        $blogPost->delete();

        return response()->json([
            'message' => 'Blog post deleted successfully.',
        ]);
    }
}