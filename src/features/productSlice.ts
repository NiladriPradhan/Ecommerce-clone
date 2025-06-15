import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

interface ProductState {
    isLoading: boolean;
    data: Product[];
    filteredData: Product[];
    cart: Product[];
    wish: Product[];
    isError: boolean;
}

const initialState: ProductState = {
    isLoading: false,
    data: [],
    filteredData: [],
    cart: [],
    wish: [],
    isError: false
}


const fetchProducts = createAsyncThunk("products/fetch", async () => {
    const res = await axios.get("https://fakestoreapi.com/products");
    return res.data;
})

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {

        addToCart: (state, action: PayloadAction<number>) => {
            const productId = action.payload;
            const productToCart = state.data.find((product) => product.id === productId);

            if (productToCart) {
                // Check if the product is already in the cart
                const isAlreadyInCart = state.cart.some((item) => item.id === productId);

                if (!isAlreadyInCart) {
                    state.cart.push(productToCart);
                }
            }
        },

        addToWish: (state, action: PayloadAction<number>) => {
            const productId = action.payload;
            const productToWish = state.data.find((product) => product.id === productId);

            if (productToWish) {
                // Check if the product is already in the cart
                const isAlreadyInWish = state.wish.some((item) => item.id === productId);

                if (!isAlreadyInWish) {
                    state.wish.push(productToWish);
                }
            }
        },

        removeFromWish: (state, action: PayloadAction<number>) => {
            state.wish = state.wish.filter((w) => w.id !== action.payload);
        },

        removeFromCart: (state, action: PayloadAction<number>) => {
            state.cart = state.cart.filter((product) => product.id !== action.payload)
        },

        searchByName: (
            state, action: PayloadAction<string>
        ) => {
            const keyword = action.payload.toLowerCase();
            state.filteredData = state.data.filter(product => product.title.toLowerCase().includes(keyword))
        },


        searchByPrice: (state, action: PayloadAction<number>) => {
            const _keyprice = action.payload;
            const keyprice = parseInt(_keyprice.toString());

            state.filteredData = state.data.filter((product) => {
                if (keyprice === 100) return product.price <= 100;
                if (keyprice === 200) return product.price > 100 && product.price <= 200;
                if (keyprice === 300) return product.price <= 300;
                if (keyprice === 400) return product.price <= 400;
                if (keyprice === 500) return product.price <= 500;
                return true; //default fallback
            })
            // switch (keyprice) {
            //     case 100:
            //         state.data = state.data.filter(product => product.price <= 100);
            //         break;
            //     case 200:
            //         state.data = state.data.filter(product => product.price > 100 && product.price <= 200);
            //         break;
            //     case 300:
            //         state.data = state.data.filter(product => product.price > 200 && product.price <= 300);
            //         break;
            //     case 400:
            //         state.data = state.data.filter(product => product.price > 300 && product.price <= 400);
            //         break;
            //     case 500:
            //         state.data = state.data.filter(product => product.price > 400 && product.price <= 500);
            //         break;

            //     default:
            //         break;
            // }


        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.filteredData = action.payload;
                state.isError = false;
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
    }

})

export const { addToCart, addToWish, removeFromWish, removeFromCart, searchByName, searchByPrice } = productSlice.actions;
export default productSlice.reducer;
export { fetchProducts };
