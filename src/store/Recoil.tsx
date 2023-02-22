import { atom } from "recoil";

export const RecoilRoom = atom({
  key: "roomId",
  default: {
    id: "",
  },
});
export const RecoilPlayer = atom({
  key: "player",
  default: {
    id: "",
  },
});

// --------------------

// 値の取得

// --------------------
// import { useRecoilValue } from "recoil";
// import { ### } from "@/store/Recoil";

// export const Function = () => {
//   const _ = useRecoilValue(###);
// }

// --------------------

// 値の更新

// --------------------
// import { useSetRecoilState } from "recoil";
// import { ### } from "@/store/Recoil";

// export const Function = () => {
//   const set### = useSetRecoilState(###);

//   set###($$$)
// }
