import { INTERVAL, MAX_AUTO_HTTP_REQUEST } from "@/data/data";

export const AutoHttpRequest = (
  Fun: () => void,
  count: number,
  lastTime: number
) => {
  {
    try {
      const nowTime = Date.now();
      if (count === 0 || lastTime + INTERVAL - 100 < nowTime) {
        // eslint-disable-next-line no-console
        console.log("###  Request  ###");
        Fun();

        lastTime = nowTime;
        count += 1;

        if (MAX_AUTO_HTTP_REQUEST < count) {
          throw count;
        }

        setTimeout(() => {
          AutoHttpRequest(Fun, count, lastTime);
        }, INTERVAL);
      }
    } catch (count) {
      // eslint-disable-next-line no-console
      console.log(`Leave AutoHTTPRequest Loop`);
    }
  }
};
