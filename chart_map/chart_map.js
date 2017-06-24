//****************************************************
// H27�N�x���������p chart_map.js
//  2017.6.11 1.0 �����J�����v����
//
//  �`���[�g�A�}�b�v�\���̊֐������^����
//  cChartDisp�AxyChartDisp

// (*)�Q�Ƃ���O���[�o���ϐ�
//    idxSetName�F 	�w�W�Z�b�g���i�`���[�g�^�C�g���j
//    idx:			�I�����ꂽ�w�W���̃C���f�b�N�X
//    idxName:		�I�����ꂽ�w�W��

//    idx2:			�I�����ꂽ��2�w�W���̃C���f�b�N�X
//    idx2Name:		�I�����ꂽ��2�w�W��

//    lgName�F   	�\�����鎩���̖��̔z��
//    idxVal:		�\������w�W�l�̔z��̔z��
//                  �����́Flg�A�w�Widx�̒l�́AidxVal[lg][idx]
//    cChartdiv�F  	�J�����`���[�g�܂���xy�`���[�g��\������div���ihtml�Œ�`����j
//    lgNameH:		�n�C���C�g���鎩���̂̎����̖�
//                  �����̃R�[�h�i�擪��5�����j���r����

// �Q�Ƃ���DOM�I�u�W�F�N�g
//    "cChartdiv"   �`���[�g��\������div

// �J���[�̒�` �Z���ƁA������
var colorH = '#3182bd';
var colorL = '#9ecae1';

// �֐� cChartDisp**************************************
//  �����F �Ȃ�
//  ����F �O���[�o���ϐ��ɐݒ肳�ꂽ�w�W�f�[�^��
//         amCharts�̎d�l�ɉ�����chartArg���쐬���A�J�����`���[�g��\������
//  �Ăяo�����F01 �ݑ��ÁE���w�W �����̔�r
//

function cChartDisp() {
  console.log("cChartDisp called");
  
  // dataPrivider��ݒ肷��
  var valSorted = [];
  var valOriginal = [];
  var lgNameSorted = [];
  
  // �e�����̂̑I�����ꂽ�w�W�̒l�����o��
  // �\�[�g�p�ƃ\�[�g��Ɏg���I���W�i���ƂQ�ێ�����
  for (var i=0; i<lgName.length; i++){
    valOriginal.push(parseFloat(idxVal[i][idx]));
    valSorted.push(parseFloat(idxVal[i][idx]))
  };

  // �w�W�l�ɂ��~���Ƀ\�[�g����
  valSorted.sort(function(a,b){
        if( a > b ) return -1;
        if( a < b ) return 1;
        return 0;
  });

  //console.log(valSorted);
  //console.log(valOriginal);

  // �\�[�g���ꂽ�w�W�l�ɍ��킹�āA�����̖������ɕ��ׂ�
  for (var i=0; i<lgName.length; i++){

    //���̔z��ł̓Y����
    var hit = $.inArray(valSorted[i], valOriginal);
    lgNameSorted.push(lgName[hit]);

    //�����͂Ȃ��Ƃ����O��ŁA���ȏ�q�b�g���Ȃ��悤�ɂ���
    valOriginal[hit] = -1;
  }

  // �����̂̕\���J���[��\������
  //
  var lgColor = [];
  for (var i=0; i<lgName.length; i++){
    //console.log(lgNameH, lgName[i]);
    if (lgNameSorted[i].substring(0,5) == lgNameH.substring(0,5)){
      lgColor[i] = colorH
    } else {
      lgColor[i] = colorL
    }
  };
  //console.log(lgColorSorted);

  var dataProvider = [];
  for (var i = 0; i<lgName.length; i++){
    var p = {"lg":  lgNameSorted[i],
             "val": valSorted[i],
             "color": lgColor[i]
            };
    dataProvider.push(p);
    console.log(p);
  };

// �s���ɂ��`���[�g��\������div�̍�����ݒ�
  if (lgName.length < 25){
     $('#cChartdiv').css('height', '600')
  } else {
     $('#cChartdiv').css('height', '1200')
  }

// �`���[�g���`���\������
  var chart = AmCharts.makeChart( "cChartdiv", {
    "type": "serial",
    "theme": "light",
    "rotate": true,
  
    // �`���[�g�^�C�g���̒�`
    "titles": [{
      "text": idxSetName,
      "size": 16
      },{ 
      "text": idxName,
      "size": 16
    }],
 
    // ���L
    "allLabels":	[{
      "x":	0,
      "y":	"!10",
      "text":	"",
      "size":	8
    }],

    "dataProvider": dataProvider,
    "valueAxes": [ {
      "gridColor": "#FFFFFF",
      "gridAlpha": 0.2,
      "dashLength": 0
    } ],
  
  // �l���i�c���j�̒�` 
  //
    "valueAxes": [{
      "color":"#000000",
      "gridColor":"#FFFFFF",
      "gridAlpha": 0.2,
      "dashLength": 0,
      "minHorizontalGap":100,
      "position": "right",
      "title": "",
      "titleRotation":0,
      "titleBold": false,
      "minimum"	: 0
     }], 
  
    "gridAboveGraphs": true,
  
    "graphs": [ {
      "balloonText": "[[lg]]: <b>[[val]]</b>",
      "fillAlphas": 0.8,
      "lineAlpha": 0.2,
      "type": "column",
      "valueField": "val",
      "colorField": "color"
    }],
  
    "chartCursor": {
      "categoryBalloonEnabled": false,
      "cursorAlpha": 0,
      "zoomable": false
    },
  
    "categoryField": "lg",
    "categoryAxis": {
      "gridPosition": "start",
      "gridAlpha": 0,
      "labelRotation":90,
      "fontSize":12,
      "labelFrequency":1,
//    "tickPosition": "start",
//    "tickLength": 20
    },
    
    "export": {
      "enabled": true,
      "menu":[{
        "format":	"JPG",
        "label":	"JPG"
      },{
        "format":	"csv",
        "label":	"CSV"
      }]
    }
  });
}

// �֐� xyChartDisp**************************************
//  �����F �Ȃ�
//  ����F �O���[�o���ϐ��ɐݒ肳�ꂽ�w�W�f�[�^��
//         amCharts�̎d�l�ɉ�����chartArg���쐬���Axy�`���[�g��\������
//  �Ăяo�����F01 �ݑ��ÁE���w�W �����̔�r
//

function xyChartDisp() {
  console.log("xyChartDisp called");

  // �����̂̕\���J���[��\������
  //
  var lgColor = [];
  for (var i=0; i<lgName.length; i++){
    //console.log(lgNameH, lgName[i]);
    if (lgName[i].substring(0,5) == lgNameH.substring(0,5)){
      lgColor[i] = colorH
    } else {
      lgColor[i] = colorL
    }
  };
  //console.log(lgColorSorted);

  // dataProvider ��ݒ肷��
  var dataProvider = [];
  for (var i = 0; i<lgName.length; i++){
    var p = {"lg":  lgName[i].substring(5,lgName[i].length),
             "x":   idxVal[i][idx2],
             "y":   idxVal[i][idx],
             "color": lgColor[i]
            };
    dataProvider.push(p);
    console.log(p);
  };

// �`���[�g��\������div�̍�����ݒ�
  $('#cChartdiv').css('height', '600')

// �`���[�g���`���\������
  var chart = AmCharts.makeChart( "cChartdiv", {
    "type": "xy",
    "theme": "light",
  
    // �`���[�g�^�C�g���̒�`
    "titles": [{
      "text": idxSetName,
      "size": 16
      },{ 
      "text": "",
      "size": 16
    }],
 
    // ���L
    "allLabels":	[{
      "x":	0,
      "y":	"!10",
      "text":	"(*)���̐}�́i��ʍ��c�@�l�j�����J�����v����ҏW�������̂ł��B�E�F���l�X�Ђ̃f�[�^���ꕔ�g�p���Ă��܂��B",
      "size":	8
    }],

    "dataProvider": dataProvider,

  // �l���ixy���j�̒�` 
  //
    "valueAxes": [ {
      "position": "bottom",
      "axisAlpha": 0,
      "title": idx2Name,
      "titleFontSize":16
      },{
      "axisAlpha": 0,
      "position": "left",
      "title": idxName,
      "titleFontSize":16
    }],
    
    "graphs": [ {
      "balloonText": idx2Name + ":<b>[[x]]</b><br>" + idxName + ":<b>[[y]]</b><br>�����̖�:<b>[[lg]]</b>",
      "bullet": "circle",
      "bulletBorderAlpha": 0.2,
      "bulletAlpha": 0.8,
      "lineAlpha": 0,
      "fillAlphas": 0,
      "valueField": "lg",
      "colorField": "color",
      "xField": "x",
      "yField": "y",
      "maxBulletSize": 1,
      "labelText":	"[[lg]]",
    }],
  
    "chartCursor": {
      "categoryBalloonEnabled": false,
      "cursorAlpha": 0,
      "zoomable": false
    },
    
    "export": {
      "enabled": true,
      "menu":[{
        "format":	"JPG",
        "label":	"JPG"
      },{
        "format":	"csv",
        "label":	"CSV"
      }]
    }
  });
}
