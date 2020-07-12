'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

//入力欄でエンターキーを押したときに診断を実行
userNameInput.onkeydown = event => {
if (event.key === 'Enter'){
    assessmentButton.onclick();
    }
}
    
assessmentButton.onclick = function(){
    const userName = userNameInput.value;
    if (userName.length === 0){
        return; //名前が空の時は処理を終了する
    }
    // 診断結果表示エリアの作成
    removeAllChildren(resultDivided); //診断結果エリアの初期化
    const result = assessment(userName);
    showAssessmentResult(resultDivided, result);

    //ツイートエリアの作成
    removeAllChildren(tweetDivided); //ツイートエリアの初期化
    const a = document.createElement('a');
    const hrefValue =
        'https://twitter.com/intent/tweet?button_hashtag=' +
        encodeURIComponent('あなたのいいところ') +
        '&ref_src=twsrc%5Etfw';
    a.setAttribute('href', hrefValue);
    a.className = 'twitter-hashtag-button';
    a.setAttribute('data-text', result);
    a.innerText = 'Tweet #あなたのいいところ';
    tweetDivided.appendChild(a);

    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
}

const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
];

/**
 * 指定した要素の子供を全て削除する
 * @param {HTMLElement} element HTMLの要素 
 */
function removeAllChildren(element){
    while (element.firstChild){ //子どもの要素が有るかりぎり削除
        element.removeChild(element.firstChild)
    }    
}

/**
 * 表示エリアの作成
 * @param {HTMLElement} element HTMLの要素
 */
function showAssessmentResult(element, result){
    const header = document.createElement('h3'); //h3タグを作る
    header.innerText = '診断結果';//h3タグに'診断結果'の文字列を設定
    element.appendChild(header);//result-areaにh3変数を設定

    const paragraph = document.createElement('p'); //pタグを作る
    paragraph.innerText = result; //pタグにassessmentの結果を設定
    element.appendChild(paragraph);//result-areaにpタグを設定
}

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName){
    let userNameNumber = 0;
    for (let i =0; i < userName.length; i++){ //番号に変換
        userNameNumber += userName.charCodeAt(i);
    }
    let answerNumber = userNameNumber % answers.length; //回答結果の範囲(0ー15)に変換
    let result = answers[answerNumber]; //行列の中で該当するコメントを選択
    result = result.replace(/\{userName\}/g, userName);
    return result;
}