import React,{createContext,useContext,useEffect,useState} from "react";
import {supabase} from "./supabase";
const C=createContext(null);
export const auth = null;
export const ADMIN_EMAIL = "seunjoel05@gmail.com";
export const isAdminEmail = email => email?.trim().toLowerCase() === ADMIN_EMAIL;
const normalizeUser = user => user ? { ...user, getIdTokenResult: async () => ({ claims: { admin: isAdminEmail(user.email) } }) } : null;
export async function signInWithEmailAndPassword(_auth,email,password){if(!supabase)throw new Error("Supabase is not configured.");const {error}=await supabase.auth.signInWithPassword({email,password});if(error)throw error;}
export async function createUserWithEmailAndPassword(_auth,email,password){if(!supabase)throw new Error("Supabase is not configured.");const {data,error}=await supabase.auth.signUp({email,password,options:{emailRedirectTo:"https://seuncart1.web.app/login"}});if(error)throw error;if(!data.session)throw new Error("Account created. Check your email to confirm the account, then log in.");}
export async function signOut(_auth){await supabase?.auth.signOut();}
export function AuthProvider({children}){const[user,setUser]=useState(undefined);useEffect(()=>{if(!supabase){setUser(null);return;}let active=true;supabase.auth.getSession().then(({data})=>active&&setUser(normalizeUser(data.session?.user)));const {data:{subscription}}=supabase.auth.onAuthStateChange((_event,session)=>setUser(normalizeUser(session?.user)));return()=>{active=false;subscription.unsubscribe()}},[]);return <C.Provider value={{user}}>{children}</C.Provider>}
export const useAuth=()=>useContext(C);