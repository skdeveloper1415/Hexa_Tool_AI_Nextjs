export const msalConfig = {
              auth: {
                clientId: process.env.NEXT_PUBLIC_ONEDRIVE_CLIENT_ID,
                authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_ONEDRIVE_TENANT_ID}`,
                redirectUri:process.env.NEXT_PUBLIC_REDIRECT_URL,
              // clientId: "66620211-fec4-45b0-b223-7eae6b3be381",
              // authority: "https://login.microsoftonline.com/29b7383c-8cdc-440e-a425-3652a5dcd106",
              // redirectUri: "/",
              },
              cache: { 
                cacheLocation: "sessionStorage", 
                storeAuthStateInCookie: true,
              }
            };




            
