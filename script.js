// https://api.github.com/users/sachin9998

const url = "https://api.github.com/users";

const searchInputEl = document.getElementById("searchInput");
const searchButtonEl = document.getElementById("search-btn");
const profileContainerEl = document.getElementById("profileContainer");
const loadingEl = document.getElementById("loading");

const generateProfile = (profile) => {
  return `
        <div class="profile-box">

            <div class="top-section">

                <div class="left">
                    <div class="avatar">
                        <img src="${profile.avatar_url}" alt="">
                    </div>

                    <div class="self">
                        <h2>${profile.name}</h2>
                        <h2>${profile.login}</h2>
                    </div>
                </div>

                <a href="${profile.html_url}"><button class="primary-btn">Check Profile</button></a>
                

            </div>

            <div class="about">
                <h2>About</h2>
                <p>${profile.bio}</p>
            </div>

            <div class="status">
                <div class="status-item">
                    <h3>Followers</h3>
                    <p>${profile.followers}</p>
                </div>

                <div class="status-item">
                    <h3>Following</h3>
                    <p>${profile.following}</p>
                </div>

                <div class="status-item">
                    <h3>Repos</h3>
                    <p>${profile.public_repos}</p>
                </div>
            </div>

        </div>

        `;
};

const fetchProfile = async () => {
  const username = searchInputEl.value;

  loadingEl.innerText = "loading . . . .";
  loadingEl.style.color = "black";

  try {
    const res = await fetch(`${url}/${username}`);
    const data = await res.json();

    if (data.bio) {
      loadingEl.innerText = "";
      profileContainerEl.innerHTML = generateProfile(data);
    } else {
      loadingEl.innerHTML = data.message;
      loadingEl.style.color = "red";
    }
  } catch (error) {
    loadingEl.innerText = "";
    console.log(error);
  }
};

searchButtonEl.addEventListener("click", fetchProfile);
