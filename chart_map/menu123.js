//****************************************************
// �l�����Ԏ��n��f�[�^2017�N�� �t��DVD�p ���j���[����
//  2016.11.17 1.0 �����J�����v����
//
// l1,l2,l3���j���[�̏����ݒ�A����эđI�����ꂽ�Ƃ��̏���
//
// �֐� initMenu()**************************************
//  �����F ����
//  ����F �O���[�o���ϐ�(*)���Q�Ƃ��A���j���[�t�@�C����ǂݍ��݁A
//         L1L2L3���j���[������������
//  �Ăяo�����F���������A����сA�\������ICD�o�[�W�����ύX��

// (*)�Q�ƁE�X�V����O���[�o���ϐ�
//    menuDir:    ���j���[�t�@�C���̃f�B���N�g��
//    l1menuArea: l1���j���[�t�@�C����ǂݍ��ރG���A
//    l2menuArea: l2���j���[�t�@�C����ǂݍ��ރG���A
//    l3menuArea: l3���j���[�t�@�C����ǂݍ��ރG���A
//
//    codWcode�F  ���݂̎�����ƃR�[�h
//    codName�F   ���݂̎������ޖ�
//
//    l1menu:     l1���j���[�̗v�fID�ihtml�Œ�`�j
//    l1code�F    ���݂�l1�R�[�h
//    l1name�F    ���݂�l1����
//    l1code0�F   ������������ƃR�[�h
//
//    l2menu:     l2���j���[�̗v�fID�ihtml�Œ�`�j
//    l2code�F    ���݂�l2�R�[�h
//    l2name�F    ���݂�l2����
//    l2code0�F   �͂�������ƃR�[�h
//
//    l3menu:     l3���j���[�̗v�fID�ihtml�Œ�`�j
//    l3code�F    ���݂�l3�R�[�h
//    l3name�F    ���݂�l3����
//    l3code0�F   ���ԕ��ރR�[�h��������ƃR�[�h
//
//    dCountDir:  ���S���t�@�C���̃f�B���N�g��
//    fChar�F     �ǂݍ��ރf�[�^�̃t�@�C���R�[�h
//    gender:     �ǂݍ��ރf�[�^�̐���
//    dCount:     �ǂݍ��񂾃f�[�^���i�[����̈�
//    fCharInit:  �t�@�C���R�[�h�̏����l�i01�܂���A�j
function initMenu(){
// �������ރt�@�C����ǂݍ��݁A�K�w1,2,3���j���[���쐬����
//   (1)l1menu.csv��ǂݍ��݁A�̓��j���[��ݒ肷��
// 20170224 2017DVD��{���ނ̏ꍇ�AICD�Ŗ��̃f�B���N�g��

  console.log("initMenu called:");
  
// �����R�[�h��������������

  fChar = fCharInit;
  codWCode = 0;
  codName ="";
  
  l1code = 0;
  l1name = "";
  l1code0 = 0;
  
  l2code = 0;
  l2name = "";
  l2code0 = 0;

  l3code = 0;
  l3name = "";
  l3code0 = 0;
  
  gender = "T";
  genderName = "���v";
  
  type = "0";
  typeName = "���S�� ����";
  
// l2l3���j���[������������
// l1���v�������i20170306�j
  
  $('select#l1menu option').remove();
  $('select#l2menu option').remove();
  $('select#l3menu option').remove();
  
  
// ���j���[�t�@�C����ǂݍ���
  fName = menuDir + "l1menu.csv";
  fRead(fName,initMenu2);
};

function initMenu2(lines_got){
  var i,cols,key;
  console.log("initMenu2 called:"+lines_got.length);
//console.log(lines_got);
//

  for (var i=1; i<(lines_got.length); i++){
// 20170124
//  cols = lines_got[i].split(";");
    cols = lines_got[i].split(",");
    l1menuArea[i-1] = {"layer":cols[0],"text":cols[1],
                       "value":cols[2],"upLink":cols[3],
                       "fChar":cols[4]};
    console.log(l1menuArea[i-1]);
    
    // �Z���N�g�{�b�N�X��ݒ肷��
    // cols�̓��e�́A���j���[�K�w�A�l�A�e�L�X�g�A��ʃ��j���[��ƃR�[�h�A�t�@�C������
    $(function(){
      var $option = '<option value ="' + cols[2] + '">' + cols[1] + '</option>';
//    console.log($option);
      $('#l1menu').append($option);
    });
  };
  l1code0 = l1menuArea[0]["value"];
  codWCode = l1menuArea[0]["value"];
  codName = l1menuArea[0]["text"];
  
//  (2)l2menu.csv��ǂݍ��݁A���e��l2maenuArea�ɕێ�����
// 20170124
  fName = menuDir + "l2menu.csv";
  fRead(fName,initMenu3);
}

function initMenu3(lines_got){
  var i,cols;
  console.log("initMenu3 called:"+lines_got.length);
  for (var i=1; i<(lines_got.length); i++){
// 20170124
//  cols = lines_got[i].split(";");
    cols = lines_got[i].split(",");
    l2menuArea[i-1] = {"layer":cols[0],"text":cols[1],
                       "value":cols[2],"upLink":cols[3],
                       "fChar":cols[4]};
//  console.log(l2menuArea[i-1]);
  };
// (2-3)l3menu.csv��ǂݍ��݁A���e��l3maenuArea�ɕێ�����
// 20170124
  fName = menuDir + "l3menu.csv";
  fRead(fName,initMenu4);
}

function initMenu4(lines_got){
  var i,cols;
  console.log("initMenu4 called:"+lines_got.length);
  for (var i=1; i<(lines_got.length); i++){
// 20170124
//  cols = lines_got[i].split(";");
    cols = lines_got[i].split(",");
    l3menuArea[i-1] = {"layer":cols[0],"text":cols[1],
                       "value":cols[2],"upLink":cols[3],
                       "fChar":cols[4]};
  };
//  (3)�����`���[�g�p�̃f�[�^���Ăяo��
//      
  $('#l1menu').val(l1code0);
  var fName = dCountDir + fChar + gender + ".csv";
  fRead(fName, initMenu5);
};

function initMenu5(lines_got){
  var i,cols;
  dCount = [];
  console.log("initMenu5 called:"+lines_got.length);
  for (var i=1; i<(lines_got.length); i++){
    cols = lines_got[i].split(",");
    dCount[i-1] = cols;
  };
  sChartDisp();
};

// �I��v�f���đI�����ꂽ�Ƃ��̊֐� *******************************
//   
// (1)l1���j���[: 
//     ���ʁF                       �E l2menu�Al3menu������������
//                                  �E �I�����̃t�@�C���R�[�h������lfChar�ƈقȂ�ꍇ�A���S���v�t�@�C����ǂݍ���
//     �����s�̏ꍇ�i�I��l=�擪�s�j�E sDispChart���Ăяo��
//                                  
//     �͂̍s�̏ꍇ�i�I��l!=�擪�s�j�E�͂ɑΉ�����l2menu���쐬���Al2menu�I���C�x���g���N����
//
// (2)l2���j���[
//     ���ʁF                         �E l3menu������������
//                                    �E �I�����̃t�@�C���R�[�h������lfChar�ƈقȂ�ꍇ�A���S���v�t�@�C����ǂݍ���
//     �͂̍s�̏ꍇ�i�I��l=�擪�s�j: �E  sDispChart���Ăяo��
//
//     �������ރO���[�v�̍s�̏ꍇ�i�I��l!=�擪�s�j�F ���S���ރO���[�v�ɑΉ�����l3menu���쐬���A
//                                                    l3menu�I���C�x���g�𔭐�����
//
// (3)l3���j���[�F sDispChart���Ăяo��

//***
// ���ʊ֐�
function getFCharNew(code, area){
  console.log("getFCharNew called", fChar,code);
  for (var i = 0; i<area.length; i++){
    if (area[i].value == code){
      fCharNew = area[i].fChar;
      break;
    }
  }
  console.log("fCharNew", fCharNew)
  return(fCharNew)
};

//***
// (1)l1���j���[: 
//     ���ʁF                       �E l2menu�Al3menu������������
//                                  �E �I�����̃t�@�C���R�[�h������lfChar�ƈقȂ�ꍇ�A���S���v�t�@�C����ǂݍ���
//     �����s�̏ꍇ�i�I��l=�擪�s�j�E sDispChart���Ăяo��
//                                  
//     �͂̍s�̏ꍇ�i�I��l!=�擪�s�j�E�͂ɑΉ�����l2menu���쐬���Al2menu�I���C�x���g���N����
//
$('#l1menu').change(function(){
  console.log("l1menu changed called");
  
  // �I�����ꂽ�R�[�h�𖼑O��ۑ�����
  l1name = $('#l1menu  option:selected').text();
  console.log("l1name",l1name);
  l1code = $('#l1menu  option:selected').val();
  console.log("l1code",l1code);
  
  //l2menu�Al3menu������������
  $('select#l2menu option').remove();
  $('select#l3menu option').remove();
  
  // �͂̍s�̏ꍇ�Al2menu�̐擪�s�̍�ƃR�[�h��l2code0�ɕێ����A
  // �ǂݍ��ݍς݂�l2���j���[�s����s�����ׁAl2���j���[���Đݒ肷��
  if (l1code != l1code0){
    l2code0 = l1code;
    for (j=0; j<l2menuArea.length; j++){
      // upLink��l1���j���[�Őݒ肳�ꂽ��ƃR�[�h�Ȃ�Al2���j���[�ɒǉ�
      if (l2menuArea[j].upLink == l1code){
        $(function(){
        var $option = '<option value ="' + l2menuArea[j].value + '">' + l2menuArea[j].text + '</option>';
//      console.log($option);
        $('#l2menu').append($option);
        });
      };
    };
  };
  
  //���S���v�t�@�C����ǂݍ��ޕK�v�����邩���ׁA�K�v�Ȃ�ǂݍ���
  var fCharNew = getFCharNew(l1code, l1menuArea);
  if (fCharNew != fChar){
    fChar = fCharNew;
    var fName = dCountDir + fChar + gender + ".csv";
    fRead(fName,l1menu2);
  } else {
    l1menu3();
  }
});

// �ǂݍ��񂾑����f�[�^��dCount�ɐݒ肷��
function l1menu2(lines_got){
  var i;
  console.log("l1menu2 called:", l1name, fChar, gender, lines_got.length);
  dCount = [];
  for (i=1; i<lines_got.length; i++){
    dCount[i-1] = lines_got[i].split(",");
  }
  l1menu3();
}

// �ǂݍ��񂾑����f�[�^��dCount�ɐݒ肵�AsChartDisp���Ăяo�����i�����̏ꍇ�j�A
// �܂���l2menu�C�x���g�𔭐�������i�͂̏ꍇ�j

function l1menu3(){
  console.log("l1menu3 called:", l1name);
  // �����s�̏ꍇ
  if (l1code == l1code0){
     codName = l1name;
     codWCode = l1code;
     sChartDisp();
  // �͂̍s�̏ꍇ�A
  } else {
     $('#l2menu').val(l1code).change();
  }
}

//***
// (2)l2���j���[
//     ���ʁF                       �E l3menu������������
//                                  �E �I�����̃t�@�C���R�[�h������lfChar�ƈقȂ�ꍇ�A���S���v�t�@�C����ǂݍ���
//     �͂̍s�̏ꍇ�il2code==l2code0�j: �E �t�@�C���������قȂ�ꍇ�́A���S���v�t�@�C����ǂݍ���
//                                    �E sDispChart���Ăяo��
//                                    �E l3menu������������
//
//     �������ރO���[�v�̍s�̏ꍇ�il2code!=l2code0�j�F ���S���ރO���[�v�ɑΉ�����l3menu���쐬���A
//                                                   l3menu�I���C�x���g�𔭐�����
//
$('#l2menu').change(function(){
  console.log("l2menu changed called");
  // �I�����ꂽ�R�[�h�𖼑O��ۑ�����
  l2name = $('#l2menu  option:selected').text();
  console.log("l2name",l2name);
  l2code = $('#l2menu  option:selected').val();
  console.log("l2code",l2code);
  
  //l3menu������������
  $('select#l3menu option').remove();
  
  //�����̍s�̏ꍇ�A�ǂݍ��ݍς݂�l3���j���[�s����s�����ׁAl3���j���[���Đݒ肷��
  if (l2code != l2code0){
    for (j=0; j<l3menuArea.length; j++){
      if (l3menuArea[j].upLink == l2code) {
        $(function(){
          var $option = '<option value ="' + l3menuArea[j].value + '">' + l3menuArea[j].text + '</option>';
//        console.log($option);
          $('#l3menu').append($option);
        });
      
      }
    }
  }
  
  //���S���v�t�@�C����ǂݍ��ޕK�v�����邩���ׁA�K�v�Ȃ�ǂݍ���
  var fCharNew = getFCharNew(l2code, l2menuArea);
  if (fCharNew != fChar){
    fChar = fCharNew;
    var fName = dCountDir + fChar + gender + ".csv";
    fRead(fName,l2menu2);
  } else {
    l2menu3();
  }
});

// �ǂݍ��񂾎��S�����v�f�[�^��dCount�ɐݒ肷��
function l2menu2(lines_got){
  console.log("l2menu2 called:", l2name,fChar, gender, lines_got.length);
  dCount = [];
  for (var i=1; i<lines_got.length; i++){
    dCount[i-1] = lines_got[i].split(",");
  }
  l2menu3();
}

// ���ڂ܂��́Al3menu�C�x���g�o�R�Ń`���[�g��\������
function l2menu3(){
  console.log("l2menu3 called:", l2name);
  // �擪�s�̏ꍇ
  if (l2code == l2code0){
     codName = l2name;
     codWCode = l2code;
     sChartDisp();
  // 2�s�ȍ~�̏ꍇ�A
  } else {
     $('#l3menu').val(l2code).change();
  }
}

//***
// (3)�������đI�����ꂽ��A
//    �I�����ꂽ��������codName�A��ƃR�[�h��codWCode�ɐݒ肵�AsDispChart���Ăяo��
$('#l3menu').change(function(){
  console.log("l3menu changed called");
  // �I�����ꂽ�R�[�h�𖼑O��ۑ�����
  l3name = $('#l3menu  option:selected').text();
  console.log("l3name",l3name);
  l3code = $('#l3menu  option:selected').val();
  console.log("l3code",l3code);

  //���S���v�t�@�C����ǂݍ��ޕK�v�����邩���ׁA�K�v�Ȃ�ǂݍ���
  var fCharNew = getFCharNew(l3code, l3menuArea);
  if (fCharNew != fChar){
    fChar = fCharNew;
    var fName = dCountDir + fChar + gender + ".csv";
    fRead(fName,l3menu2);
  } else {
    l3menu3();
  }
});

// �ǂݍ��񂾎��S�����v�f�[�^��dCount�ɐݒ肷��
function l3menu2(lines_got){
  console.log("l3menu2 called:", l3name, fChar, gender, lines_got.length);
  dCount = [];
  for (var i=1; i<lines_got.length; i++){
    dCount[i-1] = lines_got[i].split(",");
  }
  l3menu3();
}

// �`���[�g��\������
function l3menu3(){
  console.log("l3menu3 called:", l3name);
  codWCode = l3code;
  codName = l3name;
  sChartDisp();
};

