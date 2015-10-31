# Simplify Skin
![미리보기](http://cfile3.uf.tistory.com/image/2314CF3D557D4E7D1D233C)

이 스킨은 티스토리 전용 스킨입니다. 아직 미흡하거나 미완성인 부분이 많습니다.<br>
계속해서 수정하여서 더 좋은 스킨을 만들도록 하겠습니다.

## About
- 폰트 : Roboto, RobotoDraft, arial, sans-serif, NanumGothic, FontAwesome
- 반응형 지원
- 본문 전용 태그 스타일 적용. (Tistory앱에선 적용안됨)
 - p 태그 기본 높이 1.5배.
 - img 태그 자동 비율 맞춤.
 - Tistory 다운로드 버튼 스타일.
- 이미지 대신 [FontAwesome](http://fortawesome.github.io/Font-Awesome/) 폰트를 사용.

## Known Issue
- 트랙백 없음.
- 댓글 숨기기 안됨.

## License
자유롭게 수정가능하며, 저작권 표시하에 재배포 가능합니다.

## How to apply
[다운로드 (v1.0)](https://github.com/OPNay/Tistory-Skin/archive/Simplify-v1.0.zip)<br>
[다운로드 (v1.1)](https://github.com/OPNay/Tistory-Skin/archive/Simplify-v1.1.zip)<br>
[다운로드 (v1.2)](https://github.com/OPNay/Tistory-Skin/archive/Simplify-v1.2.zip)<br>
[다운로드 (v1.3)](https://github.com/OPNay/Tistory-Skin/archive/Simplify-v1.3.zip)

1. 다운받은 스킨을 압축 해제 합니다.
2. Tistory 블로그 관리자 페이지로 갑니다.
3. 스킨 - 스킨 등록 버튼을 눌러 업로드 페이지로 이동합니다.
4. 업로드 페이지에서 하단에 추가 버튼을 눌러서 압축 해제한 스킨 파일들을 전부 업로드 해줍니다. 

## Changelog (v1.3)
- 폰트 추가 NanumGothic (Roboto, Arial이 한글 지원안하는경우)
- 테마 기능 추가
 - **블루**
 - 그레이
 - 그린
 - 오렌지
 - 퍼플
- 사이드 메뉴가 상단 메뉴 위에 표시 되도록 수정.
- 사이드 메뉴 스타일 일부 변경.
- 사이드 메뉴에 블로그 제목 추가.
- 사이드 메뉴 스크롤바가 필요 없을 때 숨기도록 수정.
- 페이지에 따라 사이드 메뉴의 링크 강조하는 기능 추가.
- 본문에 word-wrap스타일 적용.
- 본문 다운로드 버튼 스타일 변경.
- 일부 js파일 skin.js로 병합.
- 카드 리스트 스타일 일부 변경.
- 사이드바에 카테고리 모듈 삭제. (사이드 메뉴에 있으므로)
- 글 관리 메뉴에 '수정 (새창)'버튼 삭제.
- 검색시 검색 결과 페이지로 이동하지 않고 검색 카드 아래에 결과 카드가 나타나도록 수정.

## Settings

#### 화면 설정 :
- 메뉴에서 블로그 상단 메뉴에 나타낼 링크를 추가하세요.
- 기본화면 글 `1개`
- 글 목록 `목록만`
- 댓글 펼침 `체크` (펼치기 기능이 작동안하기때문에 필수.)
- 최근 글, 댓글, 공지 `40글자`<br>
  (CSS로 말줄임이 적용되어 있기 때문에 최대한 자연스럽게하려면 40글자로 하세요.)
- 다른 설정은 자유롭게 설정하셔도 됩니다.

#### 모바일 웹스킨 설정 :
- 모바일 웹스킨 `비활성화`
- 첫번째 스킨 선택<br>
  (다른 스킨 선택시 티스토리 앱에서 본문 배경이 다른 색으로 나올수 있습니다.)

#### 플러그인 설정 :
- 홈페이지 아이콘 표시(파비콘) `비활성화`
- 블로그 아이콘 표시 `64x64px`<br>
  (댓글에서 블로그 아이콘이 출력됩니다.)

#### 테마 설정 :
- skin.html 안에 `<link href="./images/theme_blue.css" rel="stylesheet" />` 태그 수정
- ./images/theme_blue.css에 blue를 원하는 색상으로 변경
- blue, gray, green, oragne, purple

#### 사이드바 이름 카드 설정 :
images폴더 내 skin_settings.js 파일을 메모장, notepad++등 편집기를 통해 열어주세요.
- "name":"OPNay" 부분은 네임카드 하단 @OPNay의 닉네임 부분입니다.
- "href":"https://twitter.com..." 부분은 네임카드 하단 @OPNay의 링크 부분입니다.

#### 사이드바 링크 추가 :
images폴더 내 side_link.js라는 파일을 열어주세요.
- `var link_data = [` 밑에<br>
  `{"name": 이름, "fa": 아이콘 이름, "color": 링크 색상, "link":링크주소},`이 형식으로 추가해 주세요.<br>
- 아이콘 이름은 [Font Awesome](http://fortawesome.github.io/Font-Awesome/icons)에서 확인해 주세요.
- 색상은 RGB코드`#FFFFFF, #0000FF` 또는 CSS 컬러 이름`black, white, gray 등...`으로 넣으시면 됩니다.
- 각각 이름, 아이콘 이름, 링크 색상, 링크 주소는 `"`로 묶어주세요.
