<template>
  <header class="sticky top-0 bg-color-primary shadow-lg">
    <nav
      class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6"
    >
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3">
          <i class="fa-solid fa-magnifying-glass-dollar text-2xl"></i>
          <p class="text-2xl">Fund Management System</p>
        </div>
      </RouterLink>

      <div class="flex gap-3 flex-1 justify-end">
        <i
          class="fa-solid fa-circle-info text-xl hover:text-color-secondary duration-150 cursor-pointer"
          @click="toggleModal"
        ></i>
        <i
          class="fa-solid fa-plus text-xl hover:text-color-secondary duration-150 cursor-pointer"
          @click="addFund"
          v-if="route.query"
        ></i>
      </div>

      <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
        <div class="text-black">
          <h1 class="text-2xl mb-1">About:</h1>
          <p class="mb-4">
            Fund Management Systen allows you to check stock, ETF, forex,
            technical indicators, and cryptocurrency data. This also allows
            users to save and preview the data on the homepage for faster
            viewing.
          </p>
          <h2 class="text-2xl">How it works:</h2>
          <ol class="list-decimal list-inside mb-4">
            <li>
              Search for your fund by entering the name into the search bar.
            </li>
            <li>
              Select a fund within the results, this will take you to the
              current fund list for your selection.
            </li>
            <li>
              Track the fund by clicking on the "+" icon in the top right. This
              will save the fund to view at a later time on the home page.
            </li>
          </ol>

          <h2 class="text-2xl">Removing a fund</h2>
          <p>
            If you no longer wish to track a fund, simply select the fund within
            the home page. At the bottom of the page, there will be an option to
            delete the fund.
          </p>
        </div>
      </BaseModal>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink, useRoute, useRouter } from "vue-router";
import { uid } from "uid";
import { ref } from "vue";
import BaseModal from "./BaseModal.vue";

const savedFunds = ref([]);
const route = useRoute();
const router = useRouter();
const addFund = () => {
  if (localStorage.getItem("savedFunds")) {
    savedFunds.value = JSON.parse(localStorage.getItem("savedFunds"));
  }

  const fundObj = {
    id: uid(),
    fund: route.params.fund,
  };

  savedFunds.value.push(fundObj);
  localStorage.setItem("savedFunds", JSON.stringify(savedFunds.value));

  let query = Object.assign({}, route.query);
  delete query.preview;
  query.id = fundObj.id;
  router.replace({ query });
  router.push({
    name: "home",
  });
};

const modalActive = ref(null);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};
</script>
