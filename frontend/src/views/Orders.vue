<template>
  <div class="orders">
    <h3 class="my-3">Orders</h3>
    <b-row>
      <b-col>
        <b-form-input
          v-model="filter"
          type="search"
          id="filterInput"
          placeholder="Type to Search"
        ></b-form-input>
      </b-col>
      <b-col>
        <vc-date-picker
          v-model="dateRange"
          mode="range"
          :input-props="{ placeholder: 'Select date range' }"
        />
      </b-col>
    </b-row>

    <b-table
      striped
      hover
      showEmpty
      responsive
      :items="DateFilteredData"
      :fields="fields"
      :busy="loading"
      :filter="filter"
      @filtered="onFiltered"
      :current-page="currentPage"
      :per-page="perPage"
      v-model="visibleRows"
      class="mt-3"
    >
      <template v-slot:table-busy>
        <div class="text-center text-secondary my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong> Loading...</strong>
        </div>
      </template>
    </b-table>

    <b-row>
      <b-col sm="2" md="2" lg="2" class="my-2 text-center ml-auto">
        <p>Total Rows : {{ totalRows }}</p>
      </b-col>
      <b-col sm="4" md="2" lg="2" class="my-1">
        <b-form-select
          v-model="perPage"
          id="perPageSelect"
          size="sm"
          :options="pageOptions"
        ></b-form-select>
      </b-col>
      <b-col sm="2" md="2" lg="4" class="my-1 ml-auto">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
      <b-col sm="4" md="4" lg="4" class="my-2 text-center">
        <p>Total Amount Per Page : $ {{ totalAmountPerPage.toFixed(2) }}</p>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { FETCH_DATA } from "@/store/actions.type";
import { mapState } from "vuex";
import { ProductFieldsToShow } from "@/common/product.table";

export default {
  data() {
    return {
      fields: ProductFieldsToShow,
      totalRows: 0,
      currentPage: 1,
      perPage: "5 / page",
      pageOptions: ["5 / page", "10 / page", "15 / page"],
      filter: null,
      visibleRows: [],
      dateRange: {
        start: null,
        end: null,
      },
    };
  },
  mounted() {
    this.$store.dispatch(FETCH_DATA);
  },
  computed: {
    ...mapState({
      data: (state) => state.data.data,
      data_length: (state) => state.data.data_length,
      loading: (state) => state.data.loading,
    }),
    totalAmountPerPage() {
      return this.visibleRows.reduce((accum, order) => {
        var total_amt = parseFloat(order.total_amount.split(" ")[1].trim());
        return accum + total_amt;
      }, 0.0);
    },
    DateFilteredData() {
      if (this.dateRange != null) {
        if (this.dateRange.start != null && this.dateRange.end != null) {
          var start_date = Date.parse(
            this.dateRange.start.toLocaleDateString()
          );
          var end_date = Date.parse(this.dateRange.end.toLocaleDateString());

          var filter_data = this.data.filter((order) => {
            var created_at = Date.parse(
              new Date(order.created_at).toLocaleDateString()
            );
            if (created_at >= start_date && created_at <= end_date) {
              return order;
            }
          });

          this.updateTotalRows(filter_data.length);
          return filter_data;
        }
        this.updateTotalRows(this.data.length);
        return this.data;
      } else {
        this.updateTotalRows(this.data.length);
        return this.data;
      }
    },
  },
  methods: {
    onFiltered(filteredItems) {
      this.updateTotalRows(filteredItems.length);
      this.currentPage = 1;
    },
    updateTotalRows(val) {
      this.totalRows = val;
    },
  },
  watch: {
    data_length: function(currentValue) {
      this.updateTotalRows(currentValue);
    },
  },
};
</script>
