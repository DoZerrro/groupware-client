import React, { useEffect, useState } from "react";
import Modal from "@components/modal/Modal";
import useModal from "@hooks/useModal";
import { useHistory } from "react-router-dom";
import request from "@utils/axiosUtil";

const empInfo = async () => {
  const { data } = await request.get("/emp/loginlist");
  return data;
};

const registerLoginUser = async (user) => {
  const { data } = await request.post("/emp/registerLoginUser", user);
  return data;
};

const loginRedisValue = async () => {
  const { data } = await request.get("/loginRedisValue");
  return data;
};

const initState = {
  loginCompanyNo: 0,
  loginDeptNo: 0,
};

const ORGA0030Modal = () => {
  const [employeeState, setEmployeeState] = useState([]);
  const [selectLogin, setSelectLogin] = useState(initState);
  const [redisState, setRedisState] = useState({});
  const [redisCompany, setRedisCompany] = useState();

  const history = useHistory();


  // 회사, 부서 set
  useEffect(() => {
    empInfo().then((data) => {
      setEmployeeState(data);
    });

    loginRedisValue().then((data) => {
      setRedisState(data);
      setRedisCompany(data.loginCompany);
    });
  }, []);

  // 모달 close
  const { closeModal } = useModal();

  const handleCloseModal = () => {
    closeModal();
  };


  const onClickHandlerSelectBtn = (e) => {
    const { name, value } = e.target;

    redisState[name] = Number(value);
    setRedisState({ ...redisState });
  };


  // 회사 변경 확인 클릭 버튼
  const handleOnClickChangeDeptSubmit = () => {
    // 클래스 companyDiv 내의 모든 요소를 가져온다.
    const companyDivs = document.querySelectorAll(".companyDiv");

    // 유사 배열
    // 배열 내의 모든 요소 각각에 대하여 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환
    // 가져온 요소들을 각 각 새로운 배열로 만들어 반환한다.
    Array.prototype.map.call(companyDivs, (companyDiv) => {
      // 타입이 라디오인 요소 선택
      const radio = companyDiv.querySelector("input[type='radio']");
      // 타입이 셀렉인 요소 선택
      const select = companyDiv.querySelector("select");

      // 라디오 체크된 부분의 radio값과 select값을 입력해준다.
      if (radio.checked) {
        selectLogin.loginCompanyNo = radio.value;
        selectLogin.loginDeptNo = select.value;
        setSelectLogin({ ...selectLogin });
      }
      setRedisCompany(redisState.loginCompany);
    });

    registerLoginUser(selectLogin).then(() => {
      history.push("/");
      location.reload();
      closeModal();
    });
  };

  return (
    <Modal
      onClose={handleCloseModal}
      title="접속 회사 변경"
    >

      <div>
        {employeeState.map((info) => {
          return (
            <div key={info.empNo}>
              <div>{info.profileUrl
                ? <img src={info.profileUrl} alt="프로필 이미지" style={{ width: "100px" }} />
                : <div /> }
              </div>
              <div>{info.empName}</div>
              <div>{redisState.hierarchy} / {redisState.loginEmpRank}</div>
              <div>최근 접속 IP : {info.lastLoginIp}</div>
              <div>최근 로그인 시간 : {info.lastLoginTime}</div>
              <div>현재 접속 IP : {info.loginIp}</div>

              {info.companyList.map((company) => {
                return (
                  <div key={company.companyNo} className="companyDiv">
                    <input
                      name="loginCompany"
                      type="radio"
                      checked={company.companyNo === redisState.loginCompany}
                      onChange={(e) => { onClickHandlerSelectBtn(e); }}
                      value={company.companyNo}
                      readOnly
                    />
                    {company.companyName}
                    <select
                      name="loginDept"
                      value={redisState.loginDept}
                      onChange={(e) => { onClickHandlerSelectBtn(e); }}
                    >
                      {company.deptList.map((dept) => {
                        return (
                          <option key={dept.deptNo} value={dept.deptNo} name="loginDeptNo">
                            {dept.deptName}
                          </option>
                        );
                      })}
                    </select>
                    {company.companyNo === redisCompany ? <span>접속중</span> : <div /> }
                  </div>
                );
              })}
            </div>
          );
        })}
        <button type="submit" onClick={() => { handleOnClickChangeDeptSubmit(); }}>확인</button>
        <button type="button" onClick={() => { handleCloseModal(); }}>취소</button>
      </div>

    </Modal>
  );
};

export default ORGA0030Modal;
