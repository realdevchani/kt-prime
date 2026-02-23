import React, { useState } from 'react';
import S from './style';

const Recruiting = () => {
  const [formData, setFormData] = useState({
    // 기본 정보
    profileImage: null,
    name: '',
    email: '',
    emailConfirm: '',
    phone: '',
    birthDate: '',
    address: '',
    addressDetail: '',
    
    // 지원 정보
    careerType: '신입', // 신입 / 경력
    branch: '', // 잠실점, 양재점, 신사역점
    
    // 학력사항
    education: [],
    
    // 경력사항
    experience: [],
    
    // 병역사항
    militaryService: '',
    
    // 동의 사항
    agreeRequired: false,
    agreeOptional: false,
    agreeSensitive: false,
    agreeThirdParty: false,
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profileImage: file
      }));
    }
  };

  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function(data) {
        // 도로명 주소나 지번 주소 중 선택된 주소 사용
        const address = data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress;

        setFormData(prev => ({
          ...prev,
          address: address
        }));
      }
    }).open();
  };

  const handleEducationChange = (index, field, value) => {
    const newEducation = [...formData.education];
    if (!newEducation[index]) {
      newEducation[index] = { schoolName: '', startDate: '', endDate: '', major: '' };
    }
    newEducation[index][field] = value;
    setFormData(prev => ({
      ...prev,
      education: newEducation
    }));
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, { schoolName: '', startDate: '', endDate: '', major: '' }]
    }));
  };

  const removeEducation = (index) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    const newExperience = [...formData.experience];
    if (!newExperience[index]) {
      newExperience[index] = { 
        companyName: '', 
        position: '', 
        startDate: '', 
        endDate: '', 
        description: '',
        industryType: '타업종', // 동일업종 / 타업종
        carrierType: '' // kt / lgU+ / skt
      };
    }
    newExperience[index][field] = value;
    setFormData(prev => ({
      ...prev,
      experience: newExperience
    }));
  };

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, { 
        companyName: '', 
        position: '', 
        startDate: '', 
        endDate: '', 
        description: '',
        industryType: '타업종',
        carrierType: ''
      }]
    }));
  };

  const removeExperience = (index) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 유효성 검사
    if (!formData.name || !formData.email || !formData.phone) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    if (formData.email !== formData.emailConfirm) {
      alert('이메일이 일치하지 않습니다.');
      return;
    }

    if (!formData.agreeRequired || !formData.agreeSensitive) {
      alert('필수 동의 항목에 동의해주세요.');
      return;
    }

    // 백엔드 API 호출
    try {
      // 날짜 형식 변환 (YYYY-MM-DD -> LocalDate)
      const requestData = {
        profileImage: formData.profileImage ? await convertFileToBase64(formData.profileImage) : null,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        birthDate: formData.birthDate || null,
        address: formData.address || null,
        addressDetail: formData.addressDetail || null,
        careerType: formData.careerType,
        branch: formData.branch,
        education: formData.education,
        experience: formData.experience,
        militaryService: formData.militaryService || null,
        agreeRequired: formData.agreeRequired,
        agreeOptional: formData.agreeOptional,
        agreeSensitive: formData.agreeSensitive,
        agreeThirdParty: formData.agreeThirdParty
      };

      console.log('Sending data:', requestData);

      const response = await fetch('http://localhost:10000/api/recruiting/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const result = await response.json();
        alert('지원서가 성공적으로 제출되었습니다!');
        console.log('제출 결과:', result);
        // 폼 초기화
        window.location.reload();
      } else if (response.status === 409) {
        // 중복 지원
        const error = await response.json();
        alert(error.error || '이미 지원한 내역이 있습니다.');
      } else {
        const error = await response.json();
        alert(error.error || '제출에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  // 파일을 Base64로 변환하는 헬퍼 함수
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <S.RecruitingSection>
      <S.Container>
        <S.Title>입사 지원하기</S.Title>
        
        <S.SelectionSection>
          <S.SelectionRow>
            <S.SelectionGroup>
              <S.SelectionLabel>경력 구분</S.SelectionLabel>
              <S.ToggleGroup>
                <S.ToggleButton
                  type="button"
                  $isActive={formData.careerType === '신입'}
                  onClick={() => handleInputChange('careerType', '신입')}
                >
                  신입
                </S.ToggleButton>
                <S.ToggleButton
                  type="button"
                  $isActive={formData.careerType === '경력'}
                  onClick={() => handleInputChange('careerType', '경력')}
                >
                  경력
                </S.ToggleButton>
              </S.ToggleGroup>
            </S.SelectionGroup>
            
            <S.SelectionGroup>
              <S.SelectionLabel>매장 구분</S.SelectionLabel>
              <S.Select
                value={formData.branch}
                onChange={(e) => handleInputChange('branch', e.target.value)}
              >
                <option value="">선택하세요</option>
                <option value="잠실점">잠실점</option>
                <option value="양재점">양재점</option>
                <option value="신사역점">신사역점</option>
              </S.Select>
            </S.SelectionGroup>
          </S.SelectionRow>
        </S.SelectionSection>
        
        <S.Form onSubmit={handleSubmit}>
          {/* 기본 정보 */}
          <S.Section>
            <S.SectionTitle>기본 정보</S.SectionTitle>
            <S.FormGroup>
              <S.Label>프로필 사진</S.Label>
              <S.FileUploadContainer>
                <S.FileUploadLabel htmlFor="profileImage">
                  {formData.profileImage ? (
                    <S.FilePreview>
                      <S.FilePreviewImage 
                        src={URL.createObjectURL(formData.profileImage)} 
                        alt="프로필 사진 미리보기"
                      />
                      <S.FileName>{formData.profileImage.name}</S.FileName>
                    </S.FilePreview>
                  ) : (
                    <S.FileUploadPlaceholder>
                      <S.FileUploadIcon>📷</S.FileUploadIcon>
                      <S.FileUploadText>이미지 업로드</S.FileUploadText>
                      <S.FileUploadHint>JPG, JPEG, PNG / 300×400px</S.FileUploadHint>
                    </S.FileUploadPlaceholder>
                  )}
                  <S.FileInput
                    type="file"
                    id="profileImage"
                    accept="image/jpeg,image/jpg,image/png"
                    onChange={handleFileChange}
                  />
                </S.FileUploadLabel>
              </S.FileUploadContainer>
            </S.FormGroup>
            <S.FormGroup>
              <S.Label htmlFor="name">이름 <S.Required>*</S.Required></S.Label>
              <S.Input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </S.FormGroup>

            <S.FormGroup>
              <S.Label htmlFor="email">이메일 <S.Required>*</S.Required></S.Label>
              <S.Input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </S.FormGroup>

            <S.FormGroup>
              <S.Label htmlFor="emailConfirm">이메일 확인 <S.Required>*</S.Required></S.Label>
              <S.Input
                type="email"
                id="emailConfirm"
                value={formData.emailConfirm}
                onChange={(e) => handleInputChange('emailConfirm', e.target.value)}
                required
              />
            </S.FormGroup>

            <S.FormGroup>
              <S.Label htmlFor="phone">전화번호 <S.Required>*</S.Required></S.Label>
              <S.Input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value.replace(/-/g, ''))}
                placeholder="01012345678 ('-' 없이 입력)"
                required
              />
            </S.FormGroup>

            <S.FormGroup>
              <S.Label htmlFor="birthDate">생년월일</S.Label>
              <S.Input
                type="date"
                id="birthDate"
                value={formData.birthDate}
                onChange={(e) => handleInputChange('birthDate', e.target.value)}
              />
            </S.FormGroup>

            <S.FormGroup>
              <S.Label htmlFor="address">주소</S.Label>
              <S.AddressRow>
                <S.Input
                  type="text"
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="주소 검색"
                  readOnly
                />
                <S.Button type="button" onClick={handleAddressSearch}>
                  주소 검색
                </S.Button>
              </S.AddressRow>
              <S.Input
                type="text"
                value={formData.addressDetail}
                onChange={(e) => handleInputChange('addressDetail', e.target.value)}
                placeholder="상세 주소 (선택)"
                style={{ marginTop: '0.5rem' }}
              />
            </S.FormGroup>
          </S.Section>

          {/* 학력사항 */}
          <S.Section>
            <S.SectionTitle>학력사항</S.SectionTitle>
            {formData.education.map((edu, index) => (
              <S.EducationItem key={index}>
                <S.ItemActions>
                  <S.RemoveButton type="button" onClick={() => removeEducation(index)}>
                    삭제
                  </S.RemoveButton>
                </S.ItemActions>
                <S.ItemContent>
                  <S.FormGroup>
                    <S.Label>학교명</S.Label>
                    <S.Input
                      type="text"
                      value={edu.schoolName || ''}
                      onChange={(e) => handleEducationChange(index, 'schoolName', e.target.value)}
                    />
                  </S.FormGroup>
                  <S.FormRow>
                    <S.FormGroup>
                      <S.Label>시작 연월</S.Label>
                      <S.Input
                        type="month"
                        value={edu.startDate || ''}
                        onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                      />
                    </S.FormGroup>
                    <S.FormGroup>
                      <S.Label>종료 연월</S.Label>
                      <S.Input
                        type="month"
                        value={edu.endDate || ''}
                        onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
                      />
                    </S.FormGroup>
                  </S.FormRow>
                  <S.FormGroup>
                    <S.Label>전공</S.Label>
                    <S.Input
                      type="text"
                      value={edu.major || ''}
                      onChange={(e) => handleEducationChange(index, 'major', e.target.value)}
                    />
                  </S.FormGroup>
                </S.ItemContent>
              </S.EducationItem>
            ))}
            <S.AddButton type="button" onClick={addEducation}>
              항목 추가
            </S.AddButton>
          </S.Section>

          {/* 경력사항 */}
          <S.Section>
            <S.SectionTitle>경력사항</S.SectionTitle>
            {formData.experience.map((exp, index) => (
              <S.ExperienceItem key={index}>
                <S.ItemActions>
                  <S.RemoveButton type="button" onClick={() => removeExperience(index)}>
                    삭제
                  </S.RemoveButton>
                </S.ItemActions>
                <S.ItemContent>
                  <S.FormGroup>
                    <S.Label>업종 구분</S.Label>
                    <S.ToggleGroup>
                      <S.ToggleButton
                        type="button"
                        $isActive={exp.industryType === '동일업종'}
                        onClick={() => handleExperienceChange(index, 'industryType', '동일업종')}
                      >
                        동일업종
                      </S.ToggleButton>
                      <S.ToggleButton
                        type="button"
                        $isActive={exp.industryType === '타업종'}
                        onClick={() => handleExperienceChange(index, 'industryType', '타업종')}
                      >
                        타업종
                      </S.ToggleButton>
                    </S.ToggleGroup>
                  </S.FormGroup>
                  
                  {exp.industryType === '동일업종' && (
                    <S.FormGroup>
                      <S.Label>통신사 선택</S.Label>
                      <S.ToggleGroup>
                        <S.ToggleButton
                          type="button"
                          $isActive={exp.carrierType === 'kt'}
                          onClick={() => handleExperienceChange(index, 'carrierType', 'kt')}
                        >
                          KT
                        </S.ToggleButton>
                        <S.ToggleButton
                          type="button"
                          $isActive={exp.carrierType === 'lgU+'}
                          onClick={() => handleExperienceChange(index, 'carrierType', 'lgU+')}
                        >
                          LG U+
                        </S.ToggleButton>
                        <S.ToggleButton
                          type="button"
                          $isActive={exp.carrierType === 'skt'}
                          onClick={() => handleExperienceChange(index, 'carrierType', 'skt')}
                        >
                          SKT
                        </S.ToggleButton>
                      </S.ToggleGroup>
                    </S.FormGroup>
                  )}
                  
                  <S.FormGroup>
                    <S.Label>회사명</S.Label>
                    <S.Input
                      type="text"
                      value={exp.companyName || ''}
                      onChange={(e) => handleExperienceChange(index, 'companyName', e.target.value)}
                    />
                  </S.FormGroup>
                  <S.FormGroup>
                    <S.Label>직책</S.Label>
                    <S.Input
                      type="text"
                      value={exp.position || ''}
                      onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                    />
                  </S.FormGroup>
                  <S.FormRow>
                    <S.FormGroup>
                      <S.Label>시작 연월</S.Label>
                      <S.Input
                        type="month"
                        value={exp.startDate || ''}
                        onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                      />
                    </S.FormGroup>
                    <S.FormGroup>
                      <S.Label>종료 연월</S.Label>
                      <S.Input
                        type="month"
                        value={exp.endDate || ''}
                        onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                      />
                    </S.FormGroup>
                  </S.FormRow>
                  <S.FormGroup>
                    <S.Label>업무 내용</S.Label>
                    <S.Textarea
                      value={exp.description || ''}
                      onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                      rows={4}
                    />
                  </S.FormGroup>
                </S.ItemContent>
              </S.ExperienceItem>
            ))}
            <S.AddButton type="button" onClick={addExperience}>
              항목 추가
            </S.AddButton>
          </S.Section>

          {/* 병역사항 */}
          <S.Section>
            <S.SectionTitle>병역사항</S.SectionTitle>
            <S.FormGroup>
              <S.RadioGroup>
                <S.RadioLabel>
                  <S.Radio
                    type="radio"
                    name="militaryService"
                    value="비대상"
                    checked={formData.militaryService === '비대상'}
                    onChange={(e) => handleInputChange('militaryService', e.target.value)}
                  />
                  비대상
                </S.RadioLabel>
                <S.RadioLabel>
                  <S.Radio
                    type="radio"
                    name="militaryService"
                    value="군필"
                    checked={formData.militaryService === '군필'}
                    onChange={(e) => handleInputChange('militaryService', e.target.value)}
                  />
                  군필
                </S.RadioLabel>
                <S.RadioLabel>
                  <S.Radio
                    type="radio"
                    name="militaryService"
                    value="미필"
                    checked={formData.militaryService === '미필'}
                    onChange={(e) => handleInputChange('militaryService', e.target.value)}
                  />
                  미필
                </S.RadioLabel>
                <S.RadioLabel>
                  <S.Radio
                    type="radio"
                    name="militaryService"
                    value="입영대기"
                    checked={formData.militaryService === '입영대기'}
                    onChange={(e) => handleInputChange('militaryService', e.target.value)}
                  />
                  입영대기
                </S.RadioLabel>
                <S.RadioLabel>
                  <S.Radio
                    type="radio"
                    name="militaryService"
                    value="상근"
                    checked={formData.militaryService === '상근'}
                    onChange={(e) => handleInputChange('militaryService', e.target.value)}
                  />
                  상근
                </S.RadioLabel>
                <S.RadioLabel>
                  <S.Radio
                    type="radio"
                    name="militaryService"
                    value="공익"
                    checked={formData.militaryService === '공익'}
                    onChange={(e) => handleInputChange('militaryService', e.target.value)}
                  />
                  공익
                </S.RadioLabel>
              </S.RadioGroup>
            </S.FormGroup>
          </S.Section>

          {/* 동의 사항 */}
          <S.Section>
            <S.SectionTitle>동의 사항</S.SectionTitle>
            
            <S.AgreeItem>
              <S.CheckboxLabel>
                <S.Checkbox
                  type="checkbox"
                  checked={formData.agreeRequired}
                  onChange={(e) => handleInputChange('agreeRequired', e.target.checked)}
                />
                <S.Required>개인정보 필수항목 수집 및 이용 동의 (필수)</S.Required>
              </S.CheckboxLabel>
              <S.AgreeContent>
                (주)KT 프라임 (이하 "회사"라 함)은(는) 채용 절차 진행을 위하여 귀하의 정보를 수집합니다.
                <br /><br />
                1. 수집하는 개인정보의 필수항목<br />
                • 성명, 전화번호, 이메일<br /><br />
                2. 개인정보처리의 목적<br />
                • 채용 관련 안내, 공지사항 전달, 채용 및 웹사이트 이용 관련 연락, 채용 적합성 판단 및 서류심사/면접 등의 근거 자료, 인재 DB 활용 등<br /><br />
                3. 보유기간<br />
                • 접수 지원 후 3년간, 단 정보주체의 삭제 요청이 있는 경우 지체없이 파기
              </S.AgreeContent>
            </S.AgreeItem>

            <S.AgreeItem>
              <S.CheckboxLabel>
                <S.Checkbox
                  type="checkbox"
                  checked={formData.agreeOptional}
                  onChange={(e) => handleInputChange('agreeOptional', e.target.checked)}
                />
                개인정보 선택항목 수집 및 이용 동의 (선택)
              </S.CheckboxLabel>
              <S.AgreeContent>
                (주)KT 프라임 (이하 "회사"라 함)은(는) 채용 절차 진행을 위하여 귀하의 정보를 수집합니다.
                <br /><br />
                1. 수집하는 개인정보의 선택항목<br />
                • 생년월일, 주소, 학력사항, 경력사항 등<br /><br />
                2. 개인정보처리의 목적<br />
                • 채용 관련 안내, 공지사항 전달, 채용 및 웹사이트 이용 관련 연락, 채용 적합성 판단 및 서류심사/면접 등의 근거 자료, 인재 DB 활용 등<br /><br />
                3. 보유기간<br />
                • 접수 지원 후 3년간, 단 정보주체의 삭제 요청이 있는 경우 지체없이 파기
              </S.AgreeContent>
            </S.AgreeItem>

            <S.AgreeItem>
              <S.CheckboxLabel>
                <S.Checkbox
                  type="checkbox"
                  checked={formData.agreeSensitive}
                  onChange={(e) => handleInputChange('agreeSensitive', e.target.checked)}
                />
                <S.Required>민감정보 수집 및 이용 동의 (필수)</S.Required>
              </S.CheckboxLabel>
              <S.AgreeContent>
                회사는 채용 절차 진행을 위하여 귀하의 민감 정보를 처리(수집, 이용)하기 위해서는 「개인정보보호법」 제23조 및 장애인고용촉진 및 직업재활법에 의하여 별도 동의가 필요합니다.
                <br /><br />
                1. 수집하는 민감정보 항목<br />
                • 병역사항<br /><br />
                2. 민감정보처리의 목적<br />
                • 채용 적합성 판단 및 서류심사/면접 등의 근거 자료, 인재 DB 활용 등<br /><br />
                3. 보유기간<br />
                • 접수 지원 후 3년간, 단 정보주체의 삭제 요청이 있는 경우 지체없이 파기
              </S.AgreeContent>
            </S.AgreeItem>

            <S.AgreeItem>
              <S.CheckboxLabel>
                <S.Checkbox
                  type="checkbox"
                  checked={formData.agreeThirdParty}
                  onChange={(e) => handleInputChange('agreeThirdParty', e.target.checked)}
                />
                개인정보 제3자 이용제공 동의 (선택)
              </S.CheckboxLabel>
              <S.AgreeContent>
                1. 제공받는 자 : 채용 관련 서비스 제공 업체<br />
                2. 개인정보 항목 : 성명, 전화번호, 이메일 주소, 이력서 등 채용에 필요한 개인식별이 있는 정보<br />
                3. 제공 목적 : 채용 관련 정보 및 혜택 제공<br />
                4. 보유기간 : 접수 지원 후 3년, 단 정보주체의 삭제 요청이 있는 경우 지체없이 파기
              </S.AgreeContent>
            </S.AgreeItem>
          </S.Section>

          <S.SubmitButton type="submit" className="btn-4">
            <span>지원하기</span>
          </S.SubmitButton>
        </S.Form>
      </S.Container>
    </S.RecruitingSection>
  );
};

export default Recruiting;
