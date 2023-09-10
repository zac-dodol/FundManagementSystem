<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        type="text"
        v-model="searchQuery"
        @input="getSearchResults"
        placeholder="Search for a fund"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-color-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
      />

      <p class="py-2" v-if="searchError">
        Sorry, something went wrong, please try again.
      </p>

      <ul
        v-if="alphavantageSearchResults"
        class="absolute bg-color-secondary text-white w-full shadow-md py-2 px-1"
      >
        <p
          class="py-2"
          v-if="
            !searchError && alphavantageSearchResults.bestMatches.length === 0
          "
        >
          No results match your query, try a different term.
        </p>

        <template v-else>
          <li
            v-for="searchResult in alphavantageSearchResults.bestMatches"
            :key="searchResult.id"
            class="py-2 cursor-pointer"
            @click="previewFund(searchResult)"
          >
            {{ searchResult["2. name"] }}
          </li>
        </template>
      </ul>
    </div>

    <div class="flex flex-col gap-4">
      <Suspense>
        <FundList />
        <template #fallback>
          <FundCardSkeleton />
        </template>
      </Suspense>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import FundCardSkeleton from "../components/FundCardSkeleton.vue";
import FundList from "../components/FundList.vue";
import { useRouter } from "vue-router";

// page routing
const router = useRouter();
const previewFund = (searchResult) => {
  router.push({
    name: "fundView",
    params: {
      fund: searchResult["2. name"],
    },
    query: {
      name: searchResult["2. name"],
      region: searchResult["4. region"],
      preview: true,
    },
  });
};

// get API
const searchQuery = ref("");
const queryTimeout = ref(null);
const alphavantageSearchResults = ref(null);
const searchError = ref(null);

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      const options = {
        method: "GET",
        url: "https://alpha-vantage.p.rapidapi.com/query",
        params: {
          keywords: searchQuery.value,
          function: "SYMBOL_SEARCH",
          datatype: "json",
        },
        headers: {
          "X-RapidAPI-Key":
            "3bb2e65c46msh20c24c1dbb17bedp13fedcjsnfa67c3830dfc",
          "X-RapidAPI-Host": "alpha-vantage.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        alphavantageSearchResults.value = response.data;
      } catch (error) {
        console.error(error);
        console.log("3");
      }

      return;
    }
    alphavantageSearchResults.value = null;
  }, 300);
};
</script>
