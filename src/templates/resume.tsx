import { AiFillGithub } from 'react-icons/ai'
import YouTube from 'react-youtube'
import styles from 'sass/templates/resume.module.scss'

export default function Resume() {
  return (
    <section className={styles.container}>
      <h1 className={styles.hello}>안녕하세요? 오진수입니다.</h1>
      <p>낮에는 글을, 밤에는 코드를 작성합니다.</p>
      <p>사무적이게 되기보다는 결과물을 산출하기.</p>
      <p>스타트업 정신과 애자일한 워크 스타일을 선호합니다.</p>
      <p>낯선 개발 기술에 대한 두려움이 없습니다.</p>
      <p>
        모든 건 문제를 해결하기 위한 수단으로서, 각기마다 최선의 방법을 선택할
        뿐입니다.
      </p>
      <p>최근에는 CI/CD와 DevOps에 대해 관심이 있습니다.</p>
      <h2>언어</h2>
      <hr className={styles.divider} />
      <div className={styles.table}>
        <div className={styles.element}>Typescript</div>
        <div className={styles.element}>Javascript</div>
        <div className={styles.element}>C#</div>
        <div className={styles.element}>Dart</div>
        <div className={styles.element}>Golang</div>
        <div className={styles.element}>Scss</div>
      </div>
      <h2>프레임워크/라이브러리</h2>
      <hr className={styles.divider} />
      <div className={styles.table}>
        <div className={styles.element}>Flutter</div>
        <div className={styles.element}>React.js</div>
        <div className={styles.element}>Next.js</div>
        <div className={styles.element}>Nest.js</div>
        <div className={styles.element}>Express</div>
        <div className={styles.element}>Jest.js</div>
        <div className={styles.element}>Three.js</div>
      </div>
      <h2>DB/DBMS</h2>
      <hr className={styles.divider} />
      <div className={styles.table}>
        <div className={styles.element}>Mysql</div>
        <div className={styles.element}>MariaDB</div>
        <div className={styles.element}>Typeorm</div>
        <div className={styles.element}>Firebase</div>
      </div>
      <h2>기타</h2>
      <hr className={styles.divider} />
      <div className={styles.table}>
        <div className={styles.element}>Node.js</div>
        <div className={styles.element}>Unity3D</div>
        <div className={styles.element}>AWS</div>
        <div className={styles.element}>Docker</div>
        <div className={styles.element}>Jenkins</div>
      </div>
      <h2>경험</h2>
      <hr className={styles.divider} />
      <div className={styles.exHeader}>
        <h3>공연 관련 종합 리뷰 플랫폼 커뮤니티 앱</h3>
        <p className={styles.term}>2021. 2 ~</p>
      </div>
      <p className={styles.role}>앱 디자인, 프론트엔드 개발</p>
      <p>Flutter, Dart</p>
      <h4 className={styles.refLabel}>참고</h4>
      <p>극장 데이터 zoom-in-out 뷰어 구현, OpenAPI 연동</p>
      <div className={styles.ref}>
        <img className={styles.image} src="/images/bogo-view.gif" alt="" />
        <img className={styles.image} src="/images/bogo-write.gif" alt="" />
      </div>
      <hr className={styles.divider2} />
      <div className={styles.exHeader}>
        <h3>패션 관련 스타일리스트 매칭 플랫폼</h3>
        <p className={styles.term}>2021. 5 ~</p>
      </div>
      <p className={styles.role}>웹앱 프론트엔드 리드 개발</p>
      <p>Typescript, React.js, Next.js, Scss, Express, AWS EleasticBeanstalk</p>
      <h4 className={styles.refLabel}>참고</h4>
      <p>Socket.io 이용 거래 과정이 수반되는 채팅 서비스 구현</p>
      <div className={styles.ref}>
        <img className={styles.image} src="/images/personal-profile.png" alt="" />
        <img className={styles.image} src="/images/personal-chat.jpg" alt="" />
      </div>
      <hr className={styles.divider2} />
      <div className={styles.exHeader}>
        <h3>극장 좌석 배치도 그리기 SAAS</h3>
        <p className={styles.term}>2021. 7</p>
      </div>
      <p className={styles.role}>프론트엔드 개발</p>
      <p>Typescript, React.js, Next.js, Scss</p>
      <h4 className={styles.refLabel}>참고</h4>
      <p>앱 내에서 사용할 좌석 배치도를 누구나 쉽게 공급할 수 있게끔 제작</p>
      <a href="https://theater-editor.vercel.app/" target="_blank" rel="noreferrer">https://theater-editor.vercel.app</a>
      <div className={styles.ref}>
        <img src="/images/theater-io.gif" alt="" />
      </div>
      <hr className={styles.divider2} />
      <div className={styles.exHeader}>
        <h3>노션 API를 활용한 기능명세서 웹 페이지</h3>
        <p className={styles.term}>2021. 6</p>
      </div>
      <p className={styles.role}>프론트엔드 개발</p>
      <p>Typescript, React.js, Next.js, Notion API</p>
      <h4 className={styles.refLabel}>참고</h4>
      <p>팀 프로젝트에서 사용하기 위해 간단하게 노션 API가 연동된 functional specification/todo 페이지를 빠르게 제작</p>
      <div className={styles.spacer} />
      <YouTube
        videoId="DET1D8-Lk44"
        className={styles.video}
      />
      <hr className={styles.divider2} />
      <div className={styles.exHeader}>
        <h3>Golang을 이용한 온라인 RPG 프로토타입</h3>
        <p className={styles.term}>2021. 2</p>
      </div>
      <p>클라이언트 개발, 서버 개발, 3D 모델링</p>
      <p>C#, Unity3D, Golang</p>
      <h4 className={styles.refLabel}>참고</h4>
      <p>TCP 소켓 서버 구현</p>
      <div className={styles.spacer} />
      <YouTube
        videoId="nivwMVhYTak"
        className={styles.video}
      />
      <p className={styles.dot}>
        ...
        <a href="https://github.com/tankboy091e" target="_blank" rel="noreferrer">
          <AiFillGithub className={styles.github} />
        </a>
      </p>
    </section>
  )
}
