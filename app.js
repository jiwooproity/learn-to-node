const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("NodeJS");
});

app.get("/movies", (req, res) => {
  res.send([
    {
      title: "Iron Man 2",
      description: "강철 남자 2",
    },
  ]);
});

app.get("/nodemontest", (req, res) => {
  res.send("NodeMon ?");
});

app.get(
  "/callback",
  (req, res, next) => {
    console.log("첫 시작");
    // 다음 콜백 함수 호출
    next();
  },
  (req, res) => {
    res.send("두 번째임");
  }
);

// 콜백 함수 배열 사용
const ex1 = (req, res, next) => {
  next();
};

const ex2 = (req, res, next) => {
  next();
};

app.get("/arrayCallback", [ex1, ex2]);

// 하나의 라우터로 Rest API 요청 관리
app
  .route("/customer")
  .get((req, res) => {
    res.send("get 메소드");
  })
  .post((req, res) => {
    res.send("post 메소드");
  })
  .put((req, res) => {
    res.send("put 메소드");
  })
  .delete((req, res) => {
    res.send("delete 메소드");
  });

// 라우트 분리 처리
const router = express.Router();
router
  .get("/movies", (req, res) => {
    res.send("this / route");
  })
  .post("/createMovie", (req, res) => {
    res.send("this /postd route");
  })
  .put("/modifyMovie", (req, res) => {
    res.send("this /put route");
  })
  .delete("/deleteMovie", (req, res) => {
    res.send("this /delete route");
  });

app.listen(port, () => {
  console.log(`해당 포트로 서버가 실행됩니다. http://localhost:${port}`);
});
