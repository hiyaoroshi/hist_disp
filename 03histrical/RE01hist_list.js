//estatの推移分類（mc120000.csv）をそのまま使う
// ・ https://www.e-stat.go.jp/SG1/estat/GL08020103.do?_csvDownload_&fileId=000007806049&releaseCount=1
// ・ 但し、年の列に含まれる全角スペースは削除する（エディタで手作業で作業）
//

// 初期化時と、ボタンを押されたときの関数************************
// ページが読み込まれたら、初期化の設定値でチャート表示
$(window).load(function () {
  initSet();
});

// 年次推移の設定項目は、死因、種別、性別
// (1)死因
var hiCause = 0;
var hiCauseName = "総数";
var hiCauseList = 
    {0:"総数",
     1:"Hi01 結核",
     2:"Hi02 悪性新生物",
     3:"Hi03 糖尿病",
     4:"Hi04 高血圧疾患",
     5:"Hi05 心疾患（高血圧症を除く）",
     6:"Hi06 脳血管疾患",
     7:"Hi07 肺炎",
     8:"Hi08 慢性気管支炎及び肺気腫",
     9:"Hi09 喘息",
     10:"Hi10 胃潰瘍及び十二指腸潰瘍",
     11:"Hi11 肝疾患",
     12:"Hi12 腎不全",
     13:"Hi13 老衰",
     14:"Hi14 不慮の事故",
     15:"Hi15 （再掲）交通事故",
     16:"Hi16 自殺"};

// (2)種別
//
var type = "0";
var typeName = "死亡数";
var typeList = 
    {0:"死亡数",
    1:"死亡率"};

var valAxisTitle;

var chartTitle;

// (3)性別の記号と名前
//   記号はファイル名の一部としても使用する
var gender = "T";
var genderName = "合計";
var genderList = 
    {T:"合計",M:"男性",F:"女性"};

// 種別、性別による参照位置の定義
// 0から開始する行番号、列番号で定義する
var sRowList = {T:"16",M:"131",F:"246"};
var eRowList = {T:"129",M:"244",F:"359"};
var sColList = {0:"1",1:"2"};

// 選択時の処理********************************
// (1)推移分類が再設定されたら、選択値を保持し、sChartSetを呼び出す***
//    
$('#hiCause').change(function(){
  hiCauseName = $('#hiCause option:selected').text();
  console.log("hiCauseName"+hiCauseName);
  hiCause = $('#hiCause option:selected').val();
  console.log("hiCause"+hiCause);
  sChartSet();
});

hiCause = 0;
hiCauseName = "総数";

//(2)統計種別が再設定されたら、選択値を保持し、sChartSetを呼び出す***
//    
$('#type').change(function(){
  typeName = $('#type option:selected').text();
  console.log("typeName"+typeName);
  type = $('#type option:selected').val();
  console.log("type"+type);
  sChartSet();
});

// (3)性別が再設定されたら、選択値を保持し、
// sChartSetを呼び出す***
//    
$('#gender').change(function(){  
  genderName = $('#gender option:selected').text();
  console.log("genderName" + genderName);
  gender = $('#gender option:selected').val();
  console.log("gender" + gender);
  sChartSet();
});

//関数 fRead*************************************************
//  引数： ファイル名、コールバック関数
//  コールバック関数へ渡す引数： 正常終了時読み込みデータ
//  （csvファイルを読み込み、1行ずつ分けて、配列として渡す）
function fRead(fName,fun) {
  console.log("fRead called fName: ",fName);
  var readLines = [];
  $('#msg').text('ファイル読み込み中');
  $.ajax(fName,
    { 
       dataType: 'text',
    })
      .done(function(data) {
        readLines = data.split("\n");
//      console.log(data);
// 最終行が空白行の場合、取り除く20170125
        if (readLines[readLines.length-1]==""){
          readLines.pop();
        }
        $('#msg').text('');
        fun(readLines);
        })
      .fail(function(data) {
        window.alert('ファイル読み込みエラーです。動作環境等を確認し、再度実行してください。');
      });
};

//関数 initSet*********************************************
// 引数： なし
// 呼び出し元： window load時に呼び出される
// 動作：(1)固定値により推移分類のセレクトボックスを設定
//       (2)推移分類（mc120000.csv）を読み込み、内容を保持する
//       (3)secDispChartを呼び出して、初期チャートを表示する
//       
function initSet(){
    console.log("initSet called");

// (1)固定値によりセレクトボックスを設定*********************
//
// (1.1)固定値により、推移分類のセレクトボックスるを設定する
  for (key in hiCauseList){
    $(function(){
     var $option = '<option value ="' + key + '">' + hiCauseList[key] + '</option>';
     console.log($option);
     $('#hiCause').append($option);
    });
  };

  $('#hiCause').val("0");

//(1.2)性別メニューを設定する
//
  for (key in genderList){
    $(function(){
     var $option = '<option value ="' + key + '">' + genderList[key] + '</option>';
     console.log($option);
     $('#gender').append($option);
    });
  };

  $('#gender').val("T");

//(1.3)統計種別メニューを設定する
  for (key in typeList){
    $(function(){
     var $option = '<option value ="' + key + '">' + typeList[key] + '</option>';
     console.log($option);
     $('#type').append($option);
    });
  };

  $('#type').val("0");

// (2)推移分類のファイルを読み込む
//  推移分類（mc120000.csv）を読み込み、内容を保持する
//  総数 行 17-130  1899-2015、1944-46を除く
//  男   行 132-245
//  女   行 247-360
//  列： 2-3 総数（数、率）、4-5 結核(数、率）・・・
  fName = "./mc120000.csv";
  fRead(fName,initSet2);
};

// 遷移分類のファイルが読み込まれたら、コールバックされる
function initSet2(lines_got){
var i,key,years;
  hiCount = lines_got;
  console.log("hiCount lines:"+hiCount.length);

// (3)sChartSetを呼び出して、初期マップを表示する
  sChartSet();
};

// 関数 sChartSet**************************************
//  引数： 無し
//  動作： グローバル変数に年次推移データを設定する
//  呼び出し元： 初期処理、推移分類が変更されたとき呼び出される
//  
function sChartSet() {
  console.log("sChartSet called");

  var sRow = parseInt(sRowList[gender]);
  var eRow = parseInt(eRowList[gender]);
  var sCol = parseInt(sColList[type]);
  var col = sCol + (2 * hiCause);

  dataProvider = [];

  console.log("hiCause: ", hiCause,"sRow: ",sRow,"eRow: ",eRow,"sCol: ",sCol,"col: ",col);

  for (var j=sRow; j<(eRow+1); j++){
      
 // 用意するデータは、年と、死亡率のペア
 //  年：     列1
 //  死亡数： 列2+ 2*hiCause
 //  死亡率： 列3+ 2*hiCause
 
    var stLine = hiCount[j].split(",");

 
    var pcells = {
       cat: stLine[0],
       val: stLine[col]
    };

    console.log(pcells);
    dataProvider.push(pcells);
    
  };
  
  if (type==0){
    valAxisTitle = "死亡数（人）";
    chartTitle = "死因年次推移分類による時系列死亡表示（人）"
  } else {
    valAxisTitle = "死亡率（人口10万人あたり人）",
    chartTitle = "死因年次推移分類による時系列死亡率表示（人口10万人あたり人）"
  }
  
  sChartDisp();
};

// 関数 sChartDisp
//  引数： 無し
//  動作： グローバル変数に設定された年次推移データを参照し、
//         amChartsの仕様に沿ってchartArgを作成し、シリアルチャートを表示する
//  呼び出し元：sChartSetより呼び出される

function sChartDisp(){
  console.log("sChartDisp called");
// シリアルチャートを表示する
    chartArg = {
      "type": "serial",
      "theme": "light",
      "titles": [{
        "text": chartTitle
        },{
        "text": hiCauseName + "(" + genderName + ")"
      }],
      
      // 注記
      "allLabels":	[{
        "x":	0,
        "y":	"!10",
        "text":	"(*)この図は厚生労働省人口動態統計より、（一般財団法人）厚生労働統計協会がグラフ化したものです。",
        "size":	8
      }],
 
      "legend": {
        "enabled": false
      },

      "dataProvider": dataProvider,

//    値軸（縦軸）の定義 rotate=TRUEの時は横軸
//
      "valueAxes": [{
        "color":"#000000",
        "gridColor":"#000000",
        "gridAlpha": 0.2,
        "minHorizontalGap":100,
        "position": "left",
        "title": valAxisTitle,
        "titleBold": false,
        "minimum"	: 0
      }], 

// カテゴリー項目とカテゴリー軸(横軸）の定義  rotate=TRUEの時は縦軸
//
      "categoryField": "cat",
      "categoryAxis": {
        "gridAlpha": 0.2,
        "title":	"年"
      },    

// グラフと値項目の定義
//  折れ線グラフ、ラベル表示なし、バルーンテキストあり
      "graphs":[{
      "title": "",
      "type": "line",
      "balloonText": "[[category]]年: [[val]]人",
      "labelText": "",
      "labelPosition": "right",
      "showAllValueLabels":true,
      
      // 折れ線の下を塗りつぶす指定
      "fillAlphas": 0.5,
      "lineAlpha": 1,
      "valueField":"val",
      "bullet": "round",
      "bulletSize": 6
      }],

//チャートカーソルの定義
//
      "chartCursor": {
        "cursorAlpha": 0.1,
        "cursorColor":"#000000",
        "fullWidth":true,
        "valueBalloonsEnabled": true,
        "zoomable": true
      },

  "export": {
    "enabled": true,
    "menu":[{
    "format":	"JPG",
    "label":	"Save as JPG"
    },{
    "format":	"csv",
    "label":	"Save as csv"
    }]
  }
  };  

  var chart = AmCharts.makeChart(sChartdiv,chartArg);
};
