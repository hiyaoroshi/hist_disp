//estat�̐��ڕ��ށimc120000.csv�j�����̂܂܎g��
// �E https://www.e-stat.go.jp/SG1/estat/GL08020103.do?_csvDownload_&fileId=000007806049&releaseCount=1
// �E �A���A�N�̗�Ɋ܂܂��S�p�X�y�[�X�͍폜����i�G�f�B�^�Ŏ��Ƃō�Ɓj
//

// ���������ƁA�{�^���������ꂽ�Ƃ��̊֐�************************
// �y�[�W���ǂݍ��܂ꂽ��A�������̐ݒ�l�Ń`���[�g�\��
$(window).load(function () {
  initSet();
});

// �N�����ڂ̐ݒ荀�ڂ́A�����A��ʁA����
// (1)����
var hiCause = 0;
var hiCauseName = "����";
var hiCauseList = 
    {0:"����",
     1:"Hi01 ���j",
     2:"Hi02 �����V����",
     3:"Hi03 ���A�a",
     4:"Hi04 ����������",
     5:"Hi05 �S�����i�������ǂ������j",
     6:"Hi06 �]���ǎ���",
     7:"Hi07 �x��",
     8:"Hi08 �����C�ǎx���y�єx�C��",
     9:"Hi09 �b��",
     10:"Hi10 �ݒ�ᇋy�я\��w�����",
     11:"Hi11 �̎���",
     12:"Hi12 �t�s�S",
     13:"Hi13 �V��",
     14:"Hi14 �s���̎���",
     15:"Hi15 �i�Čf�j��ʎ���",
     16:"Hi16 ���E"};

// (2)���
//
var type = "0";
var typeName = "���S��";
var typeList = 
    {0:"���S��",
    1:"���S��"};

var valAxisTitle;

var chartTitle;

// (3)���ʂ̋L���Ɩ��O
//   �L���̓t�@�C�����̈ꕔ�Ƃ��Ă��g�p����
var gender = "T";
var genderName = "���v";
var genderList = 
    {T:"���v",M:"�j��",F:"����"};

// ��ʁA���ʂɂ��Q�ƈʒu�̒�`
// 0����J�n����s�ԍ��A��ԍ��Œ�`����
var sRowList = {T:"16",M:"131",F:"246"};
var eRowList = {T:"129",M:"244",F:"359"};
var sColList = {0:"1",1:"2"};

// �I�����̏���********************************
// (1)���ڕ��ނ��Đݒ肳�ꂽ��A�I��l��ێ����AsChartSet���Ăяo��***
//    
$('#hiCause').change(function(){
  hiCauseName = $('#hiCause option:selected').text();
  console.log("hiCauseName"+hiCauseName);
  hiCause = $('#hiCause option:selected').val();
  console.log("hiCause"+hiCause);
  sChartSet();
});

hiCause = 0;
hiCauseName = "����";

//(2)���v��ʂ��Đݒ肳�ꂽ��A�I��l��ێ����AsChartSet���Ăяo��***
//    
$('#type').change(function(){
  typeName = $('#type option:selected').text();
  console.log("typeName"+typeName);
  type = $('#type option:selected').val();
  console.log("type"+type);
  sChartSet();
});

// (3)���ʂ��Đݒ肳�ꂽ��A�I��l��ێ����A
// sChartSet���Ăяo��***
//    
$('#gender').change(function(){  
  genderName = $('#gender option:selected').text();
  console.log("genderName" + genderName);
  gender = $('#gender option:selected').val();
  console.log("gender" + gender);
  sChartSet();
});

//�֐� fRead*************************************************
//  �����F �t�@�C�����A�R�[���o�b�N�֐�
//  �R�[���o�b�N�֐��֓n�������F ����I�����ǂݍ��݃f�[�^
//  �icsv�t�@�C����ǂݍ��݁A1�s�������āA�z��Ƃ��ēn���j
function fRead(fName,fun) {
  console.log("fRead called fName: ",fName);
  var readLines = [];
  $('#msg').text('�t�@�C���ǂݍ��ݒ�');
  $.ajax(fName,
    { 
       dataType: 'text',
    })
      .done(function(data) {
        readLines = data.split("\n");
//      console.log(data);
// �ŏI�s���󔒍s�̏ꍇ�A��菜��20170125
        if (readLines[readLines.length-1]==""){
          readLines.pop();
        }
        $('#msg').text('');
        fun(readLines);
        })
      .fail(function(data) {
        window.alert('�t�@�C���ǂݍ��݃G���[�ł��B����������m�F���A�ēx���s���Ă��������B');
      });
};

//�֐� initSet*********************************************
// �����F �Ȃ�
// �Ăяo�����F window load���ɌĂяo�����
// ����F(1)�Œ�l�ɂ�萄�ڕ��ނ̃Z���N�g�{�b�N�X��ݒ�
//       (2)���ڕ��ށimc120000.csv�j��ǂݍ��݁A���e��ێ�����
//       (3)secDispChart���Ăяo���āA�����`���[�g��\������
//       
function initSet(){
    console.log("initSet called");

// (1)�Œ�l�ɂ��Z���N�g�{�b�N�X��ݒ�*********************
//
// (1.1)�Œ�l�ɂ��A���ڕ��ނ̃Z���N�g�{�b�N�X���ݒ肷��
  for (key in hiCauseList){
    $(function(){
     var $option = '<option value ="' + key + '">' + hiCauseList[key] + '</option>';
     console.log($option);
     $('#hiCause').append($option);
    });
  };

  $('#hiCause').val("0");

//(1.2)���ʃ��j���[��ݒ肷��
//
  for (key in genderList){
    $(function(){
     var $option = '<option value ="' + key + '">' + genderList[key] + '</option>';
     console.log($option);
     $('#gender').append($option);
    });
  };

  $('#gender').val("T");

//(1.3)���v��ʃ��j���[��ݒ肷��
  for (key in typeList){
    $(function(){
     var $option = '<option value ="' + key + '">' + typeList[key] + '</option>';
     console.log($option);
     $('#type').append($option);
    });
  };

  $('#type').val("0");

// (2)���ڕ��ނ̃t�@�C����ǂݍ���
//  ���ڕ��ށimc120000.csv�j��ǂݍ��݁A���e��ێ�����
//  ���� �s 17-130  1899-2015�A1944-46������
//  �j   �s 132-245
//  ��   �s 247-360
//  ��F 2-3 �����i���A���j�A4-5 ���j(���A���j�E�E�E
  fName = "./mc120000.csv";
  fRead(fName,initSet2);
};

// �J�ڕ��ނ̃t�@�C�����ǂݍ��܂ꂽ��A�R�[���o�b�N�����
function initSet2(lines_got){
var i,key,years;
  hiCount = lines_got;
  console.log("hiCount lines:"+hiCount.length);

// (3)sChartSet���Ăяo���āA�����}�b�v��\������
  sChartSet();
};

// �֐� sChartSet**************************************
//  �����F ����
//  ����F �O���[�o���ϐ��ɔN�����ڃf�[�^��ݒ肷��
//  �Ăяo�����F ���������A���ڕ��ނ��ύX���ꂽ�Ƃ��Ăяo�����
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
      
 // �p�ӂ���f�[�^�́A�N�ƁA���S���̃y�A
 //  �N�F     ��1
 //  ���S���F ��2+ 2*hiCause
 //  ���S���F ��3+ 2*hiCause
 
    var stLine = hiCount[j].split(",");

 
    var pcells = {
       cat: stLine[0],
       val: stLine[col]
    };

    console.log(pcells);
    dataProvider.push(pcells);
    
  };
  
  if (type==0){
    valAxisTitle = "���S���i�l�j";
    chartTitle = "�����N�����ڕ��ނɂ�鎞�n�񎀖S�\���i�l�j"
  } else {
    valAxisTitle = "���S���i�l��10���l������l�j",
    chartTitle = "�����N�����ڕ��ނɂ�鎞�n�񎀖S���\���i�l��10���l������l�j"
  }
  
  sChartDisp();
};

// �֐� sChartDisp
//  �����F ����
//  ����F �O���[�o���ϐ��ɐݒ肳�ꂽ�N�����ڃf�[�^���Q�Ƃ��A
//         amCharts�̎d�l�ɉ�����chartArg���쐬���A�V���A���`���[�g��\������
//  �Ăяo�����FsChartSet���Ăяo�����

function sChartDisp(){
  console.log("sChartDisp called");
// �V���A���`���[�g��\������
    chartArg = {
      "type": "serial",
      "theme": "light",
      "titles": [{
        "text": chartTitle
        },{
        "text": hiCauseName + "(" + genderName + ")"
      }],
      
      // ���L
      "allLabels":	[{
        "x":	0,
        "y":	"!10",
        "text":	"(*)���̐}�͌����J���Ȑl�����ԓ��v���A�i��ʍ��c�@�l�j�����J�����v����O���t���������̂ł��B",
        "size":	8
      }],
 
      "legend": {
        "enabled": false
      },

      "dataProvider": dataProvider,

//    �l���i�c���j�̒�` rotate=TRUE�̎��͉���
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

// �J�e�S���[���ڂƃJ�e�S���[��(�����j�̒�`  rotate=TRUE�̎��͏c��
//
      "categoryField": "cat",
      "categoryAxis": {
        "gridAlpha": 0.2,
        "title":	"�N"
      },    

// �O���t�ƒl���ڂ̒�`
//  �܂���O���t�A���x���\���Ȃ��A�o���[���e�L�X�g����
      "graphs":[{
      "title": "",
      "type": "line",
      "balloonText": "[[category]]�N: [[val]]�l",
      "labelText": "",
      "labelPosition": "right",
      "showAllValueLabels":true,
      
      // �܂���̉���h��Ԃ��w��
      "fillAlphas": 0.5,
      "lineAlpha": 1,
      "valueField":"val",
      "bullet": "round",
      "bulletSize": 6
      }],

//�`���[�g�J�[�\���̒�`
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
