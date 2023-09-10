<template>
  <div class="flex flex-col flex-1 items-center">
    <!-- Banner -->
    <div
      v-if="route.query.preview"
      class="text-white p-4 bg-color-secondary w-full text-center"
    >
      <p>
        You are currently previewing this fund, click the "+" icon to start
        tracking this fund.
      </p>
    </div>
    <!-- Fund Overview -->
    <div class="container flex flex-col items-center text-white py-12">
      <h1 class="text-4xl mb-2 bg-color-secondary p-4 rounded-md">
        {{ route.params.fund }}
      </h1>
      <ul
        v-if="fundDetails"
        class="text-sm mb-12 w-full"
        v-for="searchResult in fundDetails.bestMatches"
        :key="searchResult.id"
      >
        <li class="flex justify-between w-full gap-16">
          <span> Symbol: </span>
          {{ searchResult["1. symbol"] }}
        </li>

        <li class="flex justify-between w-full gap-16">
          <span> Name: </span>
          {{ searchResult["2. name"] }}
        </li>

        <li class="flex justify-between w-full gap-16">
          <span> Type: </span>
          {{ searchResult["3. type"] }}
        </li>

        <li class="flex justify-between w-full gap-16">
          <span> Region: </span>
          {{ searchResult["4. region"] }}
        </li>

        <li class="flex justify-between w-full gap-16">
          <span> Match Score: </span>
          {{ searchResult["9. matchScore"] }}
        </li>
      </ul>
    </div>

    <hr class="border-white border-opacity-10 border w-full" />

    <div
      class="flex items-center gap-2 py-12 text-white cursor-pointer duration-150 hover:text-red-500"
      @click="removeFund"
    >
      <i class="fa-solid fa-trash"></i>
      <p>Remove Fund</p>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const fundDetails = ref(null);
const route = useRoute();
const options = {
  method: "GET",
  url: "https://alpha-vantage.p.rapidapi.com/query",
  params: {
    keywords: route.params.fund,
    function: "SYMBOL_SEARCH",
    datatype: "json",
  },
  headers: {
    "X-RapidAPI-Key": "3bb2e65c46msh20c24c1dbb17bedp13fedcjsnfa67c3830dfc",
    "X-RapidAPI-Host": "alpha-vantage.p.rapidapi.com",
  },
};

try {
  const response = await axios.request(options);
  fundDetails.value = response.data;
} catch (error) {
  console.error(error);
  console.log("1");
}

const router = useRouter();
const removeFund = () => {
  const funds = JSON.parse(localStorage.getItem("savedFunds"));
  const updatedFunds = funds.filter((fund) => fund.id !== route.query.id);
  localStorage.setItem("savedFunds", JSON.stringify(updatedFunds));
  router.push({
    name: "home",
  });
};
</script>
