const rewards = [
    { name: "🐶 반려견 무료 입장권", weight: 30 }, // 10%
    { name: "🍪 멍바", weight:30 }, // 50%
    { name: "☕ 아메리카노 쿠폰", weight: 25 }, // 30%
    { name: "🎟️ 초록멍 파티룸 대관", weight: 1 }, // 10%
    { name: "🏡 글램핑 2시간 쿠폰", weight: 5 }, // 
  ];
  
  function generateCouponCode() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }
  
  function alreadyPlayedToday() {
    const today = new Date().toDateString();
    const lastPlayed = localStorage.getItem("lastPlayed");
    return lastPlayed === today;
  }
  
  function markPlayedToday() {
    const today = new Date().toDateString();
    localStorage.setItem("lastPlayed", today);
  }
  
  document.getElementById("rewardBtn").addEventListener("click", () => {
    if (alreadyPlayedToday()) {
      alert("고객님은 욕심쟁이!");
      return;
    }
  
    const reward = rewards[Math.floor(Math.random() * rewards.length)];
    const coupon = generateCouponCode();
  
    const resultDiv = document.getElementById("result");
    resultDiv.style.display = "block";
    resultDiv.innerHTML = `
      <h2>🎁 축하합니다!</h2>
      <p>${reward} 당첨!</p>
      <p class="coupon">쿠폰 번호: ${coupon}</p>
    `;
  
    document.getElementById("shareBtn").style.display = "inline-block";
    markPlayedToday();
  });
  
  document.getElementById("shareBtn").addEventListener("click", () => {
    if (navigator.share) {
      navigator.share({
        title: "반려견 럭키박스 이벤트",
        text: "우리 강아지랑 같이 럭키박스 열어봤어! 🐾",
        url: "https://instagram.com/yourpage" // 🔗 인스타그램 링크 넣기
      }).then(() => {
        const extraReward = "🎉 추가 보상: 간식 꾸러미";
        const extraCoupon = generateCouponCode();
        document.getElementById("result").innerHTML += `
          <p>${extraReward}</p>
          <p class="coupon">추가 쿠폰 번호: ${extraCoupon}</p>
        `;
      }).catch(console.error);
    } else {
      window.location.href = "https://instagram.com/yourpage";
    }
  });
  