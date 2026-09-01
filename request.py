import requests

URL = "https://jsonplaceholder.typicode.com"

students = [
    { "id": 1, "name": "John", "course": "BSIT" },
    { "id": 2, "name": "Jane", "course": "BSIT" },
    { "id": 3, "name": "Bob", "course": "BSCS" },
    { "id": 4, "name": "Alice", "course": "BSCS" }
]

def run_get_method():
    target_student = students[1]
    query_params = {"course": target_student["course"]}
    
    response = requests.get(URL, params=query_params)
    
    if response.status_code == 200:
        data = response.json()
        print("Success! GET data received:")
        print(data)
    else:
        print(f"Failed to fetch data. Status code: {response.status_code}")

def run_post_method():
    new_student = students[0].copy()
    new_student.pop("id")
    
    response = requests.post(URL, json=new_student)
    
    if response.status_code in [200, 201]:
        print("Success! Student created via POST:", response.json())

def run_patch_method():
    target_student = students[2]
    update_payload = {"course": "BSIT"} 
    
    response = requests.patch(f"{URL}/{target_student['id']}", json=update_payload)
    if response.status_code == 200:
        print("Success! Student updated via PATCH:", response.json())

def run_delete_method():
    target_student = students[3]
    
    response = requests.delete(f"{URL}/{target_student['id']}")
    if response.status_code == 200:
        print(f"Success! Student ID {target_student['id']} deleted via DELETE.")

if __name__ == "__main__":
    run_get_method()
   # run_post_method()
    #run_patch_method()
    #run_delete_method()