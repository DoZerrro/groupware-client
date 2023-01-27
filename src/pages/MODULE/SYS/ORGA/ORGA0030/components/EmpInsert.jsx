// import { useForm } from "react-hook-form";

function EmpInsert({
  company,
  handleOnChangeEmployee,
  clickEmpAdd,
  clickMoveEmpListPage,
  idCheck,
  handleOnChangeCompany,
  department,
}) {
  // const { register, watch, formState: { errors } } = useForm();

  // console.log(watch("email"));
  return (
    <div>
      <span>사원 정보 추가하기</span>
      <div>
        <div>
          회사 :
          <select name="companyNo" onChange={(e) => {
            handleOnChangeCompany(e);
          }}>
            <option value="0">--회사 선택--</option>
            {company.map((com) => (
              <option key={com.companyNo} value={com.companyNo}>
                {com.companyName}
              </option>
            ))}
          </select>

          부서 :
          <select name="deptNo" onChange={(e) => {
            handleOnChangeEmployee(e);
          }}>
            <option value="0">--부서 선택--</option>
            {department.map((dept) => (
              <option key={dept.deptNo} value={dept.deptNo}>
                {dept.deptName}
              </option>
            ))}
          </select>

          직급 :
          <select name="empRank" onChange={(e) => {
            handleOnChangeEmployee(e);
          }}>
            <option value="-">--직급 선택--</option>
            <option value="회장">회장</option>
            <option value="사장">사장</option>
            <option value="이사">이사</option>
            <option value="부장">부장</option>
            <option value="과장">과장</option>
            <option value="대리">대리</option>
            <option value="주임">주임</option>
            <option value="사원">사원</option>
            <option value="인턴">인턴</option>
            <option value="일용직">일용직</option>
          </select>

        </div>

        <div>
          <div className="empItemImg">사진</div>
          <input type="file" onChange={(e) => {
            handleOnChangeEmployee(e);
          }}/>
        </div>

        <div>
          <span> 이름 </span>
          <input
            type="text"
            name="empName"
            onChange={(e) => {
              handleOnChangeEmployee(e);
            }}
          />
        </div>

        <div>
          <span> ID </span>
          <input
            type="text"
            name="username"
            onChange={(e) => {
              handleOnChangeEmployee(e);
            }}
            onBlur={(e) => {
              idCheck(e);
            }}
          />
        </div>

        <div>
          <span> 비밀번호 </span>
          <input type="password" name="password" onChange={(e) => {
            handleOnChangeEmployee(e);
          }}/>
        </div>

        <div>
          <span> 성별 </span>
          <select name="gender" onChange={(e) => {
            handleOnChangeEmployee(e);
          }}>
            <option value="-">--성별 선택--</option>
            <option value="남성">남성</option>
            <option value="여성">여성</option>
          </select>
        </div>

        <div>
          <span> 이메일 </span>
          <input type="email" name="email" onChange={(e) => {
            handleOnChangeEmployee(e);
          }}/>
          {/* {...register("email", { required: true })} */}
        </div>

        <div>
          <span> 휴대전화 </span>
          <input type="text" name="empPhone" onChange={(e) => {
            handleOnChangeEmployee(e);
          }}/>
        </div>

        <div>
          <span> 주소 </span>
          <input type="text" name="empAddress" onChange={(e) => {
            handleOnChangeEmployee(e);
          }}/>
          <button type="button">우편번호</button>
        </div>

        <div>
          <span>권한</span>
          <input name="empRole" type="radio" value="ROLE_USER" onChange={(e) => {
            handleOnChangeEmployee(e);
          }}/>일반
          <input name="empRole" type="radio" value="ROLE_ADMIN" onChange={(e) => {
            handleOnChangeEmployee(e);
          }}/>관리자
        </div>
      </div>

      <button type="submit" onClick={() => {
        clickEmpAdd();
      }}>추가하기
      </button>
      <button type="button" onClick={() => {
        clickMoveEmpListPage();
      }}>목록으로
      </button>
    </div>
  );
}

export default EmpInsert;
