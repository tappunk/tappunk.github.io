<template>
  <div class="not-found">
    <img src="/404.png" alt="" class="rat" />
    <p>Page Not Found</p>
    <a href="/">← Back to homepage</a>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem;
  text-align: center;
}

.rat {
  width: 256px;
  height: 256px;
  margin-bottom: 1.5rem;
}

p {
  color: var(--vp-c-text-2);
  margin: 0 0 1.5rem;
  font-size: 1.125rem;
}

a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-size: 1rem;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s;
}

a:hover {
  border-bottom-color: var(--vp-c-brand-1);
}
</style>
