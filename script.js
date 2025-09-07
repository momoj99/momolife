
  // 보상 배열 (사진, 이름, 사용 방법, 가중치 포함)
const rewards = [
  { name: "반려견 무료 입장권", weight: 30, img: "images/free_entry.jpg", usage: "카운터에 쿠폰 화면 제시 후 사용" },
  { name: "멍바", weight: 30, img: "images/mungba.jpg", usage: "카운터에 쿠폰 화면 제시 후 사용"},
  { name: "아메리카노 쿠폰", weight: 25, img: "images/americano.jpg", usage: "카운터에 쿠폰 화면 제시 후 사용" },
  { name: "초록멍 파티룸 대관", weight: 10, img: "images/partyroom.jpg", usage: "사전 예약 필수, 2시간 이용 가능" },
  { name: "글램핑 2시간 쿠폰", weight: 5, img: "images/glamping.jpg", usage: "사전 예약 필수, 화면 제시 후 사용" }
];

// 가중치 기반 랜덤 선택
function getWeightedRandom(rewards) {
  const totalWeight = rewards.reduce((sum, reward) => sum + reward.weight, 0);
  let random = Math.random() * totalWeight;
  for (let reward of rewards) {
    if (random < reward.weight) return reward; // 객체 반환
    random -= reward.weight;
  }
}

// 쿠폰 생성
function generateCouponCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// 오늘 날짜 문자열 반환 (YYYY-MM-DD)
function getToday() {
  const today = new Date();
  return today.toISOString().split("T")[0];
}

// 이미 오늘 참여했는지 확인
function alreadyPlayedToday() {
  return localStorage.getItem("rewardDate") === getToday();
}

// 오늘 참여 기록 저장
function markPlayedToday() {
  localStorage.setItem("rewardDate", getToday());
}

// 보상 버튼 클릭
document.getElementById("rewardBtn").addEventListener("click", () => {
  if (alreadyPlayedToday()) {
    alert("견주님 욕심쟁이! 🐾");
    return;
  }

  const rewardObj = getWeightedRandom(rewards);
  const coupon = generateCouponCode();

  const resultDiv = document.getElementById("result");
  resultDiv.style.display = "block";
  resultDiv.innerHTML = `
    <div class="reward-card">
      <img src="${rewardObj.img}" alt="${rewardObj.name}">
      <p>${rewardObj.name} 당첨!</p>
      <p class="usage">사용 방법: ${rewardObj.usage}</p>
      <p class="coupon">쿠폰 번호: ${coupon}</p>
    </div>
  `;

  document.getElementById("shareBtn").style.display = "inline-block";
  
  // 오늘 참여 기록 저장
  markPlayedToday();
});

// 공유 버튼 클릭
document.getElementById("shareBtn").addEventListener("click", () => {
  if (navigator.share) {
    navigator.share({
      title: "반려견 럭키박스 이벤트",
      text: "우리 강아지랑 같이 럭키박스 열어봤어! 🐾",
      url: "https://instagram.com/yourpage"
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
