<template>
  <div v-for="fundes in savedFunds" :key="fundes.id">
    <FundCard :fundes="fundes" @click="goToFundView(fundes)" />
  </div>

  <p v-if="savedFunds.length === 0">
    No funds added. To start tracking a fund, search in the field above.
  </p>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import FundCard from "./FundCard.vue";

const savedFunds = ref([]);
const getCities = async () => {
  if (localStorage.getItem("savedFunds")) {
    savedFunds.value = JSON.parse(localStorage.getItem("savedFunds"));

    const requests = [];
    savedFunds.value.forEach((fundes) => {
      const options = {
        method: "GET",
        url: "https://alpha-vantage.p.rapidapi.com/query",
        params: {
          keywords: fundes.fund,
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
        const response = axios.request(options);
        requests.push(response);
      } catch (error) {
        console.error(error);
        console.log("5");
      }
    });

    const weatherData = await Promise.all(requests);

    weatherData.forEach((value, index) => {
      savedFunds.value[index].weather = value.data;
    });
  }
};
await getCities();

const router = useRouter();
const goToFundView = (fundes) => {
  router.push({
    name: "fundView",
    params: { fund: fundes.fund },
    query: {
      id: fundes.id,
      name: fundes.fund,
    },
  });
};
</script>
