<template>
  <div class="max-w-full w-[900px] m-auto">
    <NuxtErrorBoundary>
      <SocialMediaPostGenerator />

      <div class="flex flex-col items-stretch">
        <div class="flex">
          <input
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full"
          />
          <button class="btn">GENERATE ANNOUNCEMENTS</button>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value="40"
          class="range range-secondary"
        />
        <span>explanatory text</span>

        <!-- card Twitter -->
        <div class="card w-full border-t-4 border-t-purple-600 shadow-xl mt-10">
          <div class="card-body">
            <h2 class="card-title border-b-2 border-b-gray-200">Card title!</h2>
            <p class="border-2 border-blue-200 my-3">If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions flex items-center justify-between">
              <div>character count:</div>
              <div>
                <button class="btn">REGENERATE</button>
                <button class="btn bg-purple-600">POST</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ChatWidget />
      <template #error="{ error }">
        <div>
          <p class="text-4xl pt-10">⚠️ A fatal error has occurred:</p>
          <p>{{ error }}</p>
        </div>
      </template>
    </NuxtErrorBoundary>
  </div>
</template>
