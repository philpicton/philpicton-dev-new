<script lang="ts" setup>
useSeoMeta({
  title: "Recent Posts - Phil Picton 💀",
  description: "Index of recent posts by Phil",
});

// Pagination settings
const perPage = 5;
const route = useRoute();
const currentPage = ref(Number(route.query.page) || 1);

const { data: posts } = await useAsyncData("recent-posts", () => {
  return queryCollection("blogPost")
    .order("date", "DESC")
    .select("title", "path", "description", "tags")
    .all();
});

if (!posts.value) {
  showError({
    statusCode: 500,
    message: "Failed to load posts.",
  });
}

// Compute paginated posts
const totalPages = computed(() =>
  Math.ceil((posts.value?.length || 0) / perPage),
);
const paginatedPosts = computed(() =>
  posts.value?.slice(
    (currentPage.value - 1) * perPage,
    currentPage.value * perPage,
  ),
);

// Watch for query param changes
watch(
  () => route.query.page,
  (newPage) => {
    currentPage.value = Number(newPage) || 1;
  },
);

function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    navigateTo({ path: "/writing", query: { page: page.toString() } });
  }
}
</script>

<template>
  <section>
    <h1>Recent Posts</h1>
    <hr />

    <BlogPostsList
      v-if="paginatedPosts && paginatedPosts.length > 0"
      :posts="paginatedPosts"
    />
    <p v-else>Sorry, nothing found.</p>

    <!-- Pagination controls -->
    <div class="flex justify-center gap-2 mt-6">
      <button
        :disabled="currentPage === 1"
        class="px-2 py-1 border rounded disabled:opacity-50 flex items-center justify-center"
        @click="goToPage(currentPage - 1)"
      >
        <Icon name="formkit:stepback" size="24" class="block" />
      </button>
      <button
        v-for="page in totalPages"
        :key="page"
        :aria-current="page === currentPage ? 'page' : undefined"
        :class="[
          'px-3 py-1 border rounded ',
          page === currentPage ? 'text-green-600' : '',
        ]"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>

      <button
        :disabled="currentPage === totalPages"
        class="px-2 py-1 border rounded disabled:opacity-50 flex items-center justify-center"
        @click="goToPage(currentPage + 1)"
      >
        <Icon name="formkit:stepforward" size="24" />
      </button>
    </div>
  </section>
</template>
