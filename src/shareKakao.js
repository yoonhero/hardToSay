/* shareKakao.js */

export const shareKakao = (siteUrl) => {
  const sharedUrl = window.location.href + "card/";

  if (window.Kakao) {
    const kakao = window.Kakao;
    // 중복 initialization 방지
    if (!kakao.isInitialized()) {
      // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
      kakao.init("e3c92ffffb511df88984ed733797f4df");
    }
    kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "그전까지 전하기 어려웠던 말들",
        description:
          "당신에게 전할 말이 있습니다. 평소 전하기 어려웠던 말들을 해봅니다. 여러분도 평소 고마운 사람에게 고마운 마음을 표현하지 못했다면 표현해보세요. ",
        imageUrl: "https://hardtosay.netlify.app/saying.png",
        link: {
          webUrl: sharedUrl + siteUrl,
          mobileWebUrl: sharedUrl + siteUrl,
        },
      },
      buttons: [
        {
          title: "당신에게 전하는 말",
          link: {
            webUrl: sharedUrl + siteUrl,
            mobileWebUrl: sharedUrl + siteUrl,
          },
        },
      ],
    });
  }
};
